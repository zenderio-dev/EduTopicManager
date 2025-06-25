// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useLazyMyAccountQuery } from "@/services/auth/userApi";
// import { getAuthToken } from "@/utils/auth";

// const roleRedirectMap: Record<string, string> = {
//   student: "/student/themes",
//   teacher: "/teacher/themes",
//   admin: "/admin/students",
// };

// export const useAuthRedirect = (options?: { protectedRoles?: string[] }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const token = getAuthToken();
//   const [fetchMyAccount, { data: user, isFetching }] = useLazyMyAccountQuery();

//   useEffect(() => {
//     if (!token) return;

//     const run = async () => {
//       try {
//         const userData = await fetchMyAccount().unwrap();

//         const target = roleRedirectMap[userData.role];
//         const isOnAllowedPage = options?.protectedRoles?.includes(userData.role);

//         // Если мы на /login или / (или просто не там, где надо)
//         if (!isOnAllowedPage && pathname !== target) {
//           router.replace(target);
//         }
//       } catch (err) {
//         console.warn("User not authenticated or error fetching account", err);
//         // Можешь сделать logout() или redirect to login тут при 401
//       }
//     };

//     run();
//   }, [token, pathname]);
// };
