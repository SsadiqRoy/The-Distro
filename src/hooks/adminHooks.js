import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewAdmin, login, logout, mySelf, updateAdmin, updatePassword } from "../models/adminModel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getErrMessage } from "../utilities/utilities";

const queryKey = ["admin"];

export function useLogin() {
  const queryClient = useQueryClient();
  const navigator = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    mutationKey: queryKey,
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.setQueryData(["admin"], response.admin);
      navigator("/dashboard");
    },
  });

  return { mutate, isPending };
}

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    mutationKey: queryKey,
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.setQueryData(["admin"], null);
      window.setTimeout(() => window.location.reload(), 3500);
    },
  });

  return { logOut: mutate, logingOut: isPending };
}

export function useGetAdmin() {
  const { isLoading, data } = useQuery({ queryKey, queryFn: mySelf });

  return { isLoading, admin: data };
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: updateAdmin,
    mutationKey: queryKey,
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      queryClient.setQueryData(queryKey, response.data);
      toast.success(response.message);
    },
  });

  return { updatingAdmin: isPending, updateAdmin: mutate };
}

export function useUpdatePassword() {
  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => toast.success(response.message),
  });

  return { updatePassword: mutate, updatingPassword: isPending };
}

export function useAddAdmin() {
  const { mutate, isPending } = useMutation({
    mutationFn: addNewAdmin,
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => toast.success(response.message),
  });

  return { addAdmin: mutate, addingAdmin: isPending };
}
