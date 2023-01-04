import billApi from '@/services/api/billApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Bill, BillRequest } from '@/types/bill'
import type { Ref } from 'vue'

export function useListQuery() {
	return useQuery({
		queryKey: ['bills'],
		queryFn: billApi.list,
		refetchInterval: 300000,
	})
}

export function useFindQuery(id: string, enabled?: Ref<boolean>) {
	return useQuery({
		queryKey: ['bills', id],
		queryFn: () => billApi.find(id),
		enabled: enabled,
	})
}

export function useRegisterBill() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['billsRegister'],
		mutationFn: (request: BillRequest) => billApi.register(request),
		onSuccess: (data: Bill) => {
			queryClient.setQueryData<Bill[]>(['bills'], (oldData) => {
				return oldData ? [...oldData, data] : [data]
			})
		},
	})
}

export function useUpdateQuery(id: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['billsUpdate', id],
		mutationFn: (request: BillRequest) => billApi.update(id, request),
		onSuccess: (_, variables) => {
			queryClient.setQueryData(['bills', id], { id, ...variables })
		},
	})
}
