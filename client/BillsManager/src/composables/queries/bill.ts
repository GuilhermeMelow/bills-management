import billApi from '@/services/api/billApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { BillRequest } from '@/types/bill'
import type { Ref } from 'vue'

export function useListQuery() {
	return useQuery(['bills'], billApi.list)
}

export function useFindQuery(id: string, enabled?: Ref<boolean>) {
	const queryKey = ['bills', id]

	return useQuery(queryKey, () => billApi.find(id), {
		enabled: enabled,
	})
}

export function useRegisterBill() {
	const queryClient = useQueryClient()

	const register = (request: BillRequest) => billApi.register(request)

	return useMutation(['billsRegister'], register, {
		onSuccess: () => queryClient.invalidateQueries(['bills']),
	})
}

export function useUpdateQuery(id: string) {
	const queryClient = useQueryClient()

	const update = (request: BillRequest) => billApi.update(id, request)

	return useMutation(['billsUpdate', id], update, {
		onSuccess: () => queryClient.invalidateQueries(['bills', id]),
	})
}
