import { useCallback, useEffect, useState } from "react";
import type { FarmCreate } from "../../model/entities/FarmCreate";
import type { FarmUpdate } from "../../model/entities/FarmUpdate";
import type { FarmItem } from "../../model/entities/FarmItem";
import type { FarmsRepository } from "../../model/repositories/FarmsRepository";

export type FarmFormMode = "create" | "update";

export interface FarmFormValues {
  farm_name: string;
  province: string;
  city_municipality: string;
  address_line: string;
  is_active: boolean;
}

export type FarmFormField = keyof FarmFormValues;
export type FarmFormFieldErrors = Partial<Record<FarmFormField, string>>;

export interface FarmFormDeps {
  repository?: FarmsRepository;
  gateway?: FarmsRepository;
  navigate: (path: string) => void;
  farmId?: string;
  initialFarm?: FarmItem | FarmCreate;
}

const emptyValues: FarmFormValues = {
  farm_name: "",
  province: "",
  city_municipality: "",
  address_line: "",
  is_active: true,
};

const getInitialValues = (
  initialFarm: FarmItem | FarmCreate | undefined,
): FarmFormValues => {
  if (!initialFarm) {
    return { ...emptyValues };
  }

  if ("name" in initialFarm && "location" in initialFarm) {
    return {
      farm_name: initialFarm.name,
      province: initialFarm.province ?? "",
      city_municipality: initialFarm.cityMunicipality ?? "",
      address_line: initialFarm.addressLine ?? initialFarm.location,
      is_active: true,
    };
  }

  return {
    farm_name: initialFarm.farm_name,
    province: initialFarm.province,
    city_municipality: initialFarm.city_municipality,
    address_line: initialFarm.address_line ?? "",
    is_active: initialFarm.is_active ?? true,
  };
};

const validate = (values: FarmFormValues): FarmFormFieldErrors => {
  const errors: FarmFormFieldErrors = {};
  if (!values.farm_name.trim()) {
    errors.farm_name = "Farm name is required.";
  }
  if (!values.province.trim()) {
    errors.province = "Province is required.";
  }
  if (!values.city_municipality.trim()) {
    errors.city_municipality = "City or municipality is required.";
  }
  return errors;
};

export function useFarmFormViewModel(deps: FarmFormDeps) {
  const repository = deps.repository ?? deps.gateway;
  if (!repository) {
    throw new Error("A farm repository or gateway is required.");
  }

  const mode: FarmFormMode = deps.farmId ? "update" : "create";
  const [values, setValues] = useState<FarmFormValues>(() =>
    getInitialValues(deps.initialFarm),
  );
  const [loadStatus, setLoadStatus] = useState<"idle" | "loading" | "ready" | "error">(
    deps.farmId ? "loading" : "idle",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FarmFormFieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    if (!deps.farmId || deps.initialFarm) {
      if (deps.initialFarm) {
        setValues(getInitialValues(deps.initialFarm));
      }
      setLoadStatus("ready");
      return;
    }

    if (!repository.getFarmById) {
      setLoadStatus("error");
      setError("This repository cannot load farms for editing.");
      return;
    }

    let cancelled = false;
    setLoadStatus("loading");
    setError(null);

    void repository.getFarmById(deps.farmId).then(
      (farm) => {
        if (cancelled) {
          return;
        }
        setValues({
          farm_name: farm.name,
          province: farm.province ?? "",
          city_municipality: farm.cityMunicipality ?? "",
          address_line: farm.addressLine ?? farm.location,
          is_active: true,
        });
        setLoadStatus("ready");
      },
      () => {
        if (!cancelled) {
          setLoadStatus("error");
          setError("We couldn't load this farm. Check your connection and try again.");
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [deps.farmId, deps.initialFarm, repository, loadAttempt]);

  const setField = useCallback(
    (field: FarmFormField, value: string | boolean) => {
      setValues((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }
        const next = { ...current };
        delete next[field];
        return next;
      });
      setError(null);
    },
    [],
  );

  const reset = useCallback(() => {
    setValues(getInitialValues(deps.initialFarm));
    setFieldErrors({});
    setError(null);
  }, [deps.farmId, deps.initialFarm]);

  const submit = useCallback(async (): Promise<FarmItem | null> => {
    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return null;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (mode === "create") {
        const farmData: FarmCreate = {
          farm_name: values.farm_name.trim(),
          province: values.province.trim(),
          city_municipality: values.city_municipality.trim(),
          address_line: values.address_line.trim() || null,
          is_active: values.is_active,
        };
        const farm = await repository.createFarm(farmData);
        deps.navigate(`/farms/${farm.id}/dashboard`);
        return farm;
      }

      if (!deps.farmId) {
        throw new Error("A farm ID is required to update a farm.");
      }
      if (!repository.updateFarm) {
        throw new Error("This repository cannot update farms.");
      }

      const farmData: FarmUpdate = {
        farm_name: values.farm_name.trim(),
        province: values.province.trim(),
        city_municipality: values.city_municipality.trim(),
        address_line: values.address_line.trim() || null,
        is_active: values.is_active,
      };
      const farm = await repository.updateFarm(deps.farmId, farmData);
      deps.navigate(`/farms/${farm.id}/dashboard`);
      return farm;
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : mode === "create"
            ? "We couldn't create this farm. Check your connection and try again."
            : "We couldn't update this farm. Check your connection and try again.",
      );
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [deps, mode, repository, values]);

  const retryLoad = useCallback(() => {
    if (!deps.farmId) {
      setLoadStatus("ready");
      return;
    }
    setLoadAttempt((attempt) => attempt + 1);
  }, [deps.farmId]);

  return {
    mode,
    isCreateMode: mode === "create",
    isUpdateMode: mode === "update",
    values,
    loadStatus,
    isLoading: loadStatus === "loading",
    isSubmitting,
    fieldErrors,
    error,
    setField,
    changeField: setField,
    reset,
    submit,
    create: submit,
    update: submit,
    retryLoad,
  };
}

export type FarmFormViewModel = ReturnType<typeof useFarmFormViewModel>;