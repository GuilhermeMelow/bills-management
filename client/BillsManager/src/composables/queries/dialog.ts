import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export function useDialog() {
	return useQuery(['dialog'], () => false)
}

export function useUpdateDialog() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			queryClient.setQueryData<boolean>(['dialog'], (oldData) => !oldData)
		},
	})
}
