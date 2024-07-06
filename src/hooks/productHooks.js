import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, getProducts, updateProduct } from "../models/productModel";
import { useSearchParams } from "react-router-dom";
import { getErrMessage } from "../utilities/utilities";
import toast from "react-hot-toast";

export function useGetProducts() {
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { data, isLoading } = useQuery({
    queryKey: ["products", fullFilter],
    queryFn: () => getProducts(fullFilter),
  });

  return { data, isLoading };
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    mutationKey: ["new product"],
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      // queryClient.setQueryData(["new product"], response.data);
      queryClient.invalidateQueries({ queryKey: ["products", fullFilter] });
    },
  });

  return { isAdding: isPending, addProduct: mutate };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update product"],
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["products", fullFilter] });
    },
  });

  return { updateProduct: mutate, isUpdating: isPending };
}
