import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getErrMessage } from "../utilities/utilities";

export function useGetData(queryKey, queryFn) {
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, fullFilter],
    queryFn: () => queryFn(fullFilter),
  });

  return { data, isLoading };
}

export function useCreateData(queryKey, mutationFn) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn,
    mutationKey: [`current in ${queryKey}`],
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: [queryKey, fullFilter] });
    },
  });

  return { isCreating: isPending, createData: mutate };
}

export function useUpdateData(queryKey, mutationFn) {
  const { isCreating, createData } = useCreateData(queryKey, mutationFn);
  return { isUpdating: isCreating, updateData: createData };
}
