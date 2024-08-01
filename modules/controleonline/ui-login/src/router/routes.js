export const routes = [
  {
    path: "/",
    component: () =>  import ("@controleonline/ui-layout/src/layouts/MainLayout.vue"),
    children: [
      {
        name: "LoginIndex",
        path: "login",
        component: () =>  import ("../pages/Login.vue"),
      },
    ],
  },
];
