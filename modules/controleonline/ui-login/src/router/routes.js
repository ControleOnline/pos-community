export const routes = [
  {
    path: "/",
    component: () =>
      import("@controleonline/ui-layout/src/layouts/MainLayout.vue"),
    children: [
      {
        name: "LoginIndex",
        path: "login",
        meta: { isPublic: true },
        component: () => import("../pages/Login.vue"),
      },
      {
        name: "CreateUserIndex",
        path: "create-user",
        meta: { isPublic: true },
        component: () => import("../pages/Login.vue"),
      },
      {
        name: "ForgotPassword",
        path: "forgot-password",
        meta: { isPublic: true },

        component: () => import("../pages/Login.vue"),
      },
    ],
  },
];
