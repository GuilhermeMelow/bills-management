import billApi from '@/services/api/billApi'
import type { Bill, BillRequest } from '@/types/bill'
import type { Ref } from 'vue'
import { useQuery, useMutation } from 'vue-query'

export function useListQuery() {
	return useQuery('bills', billApi.list)
}

export function useRegisterBill() {
	return useMutation((request: BillRequest) => billApi.register(request))
}

export function useFindQuery(id: string, enabled?: Ref<boolean>) {
	const queryKey = ['bill', id]

	return useQuery(queryKey, () => billApi.find(id), {
		enabled: enabled,
	})
}

export function useUpdateQuery() {
	return useMutation((request: Bill) => billApi.update(request.id, request))
}
