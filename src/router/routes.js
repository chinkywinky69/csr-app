const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/admissions",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "apply",
        component: () => import("pages/ApplyPage.vue"),
        name: "apply",
      },
    ],
  },

  {
    path: "/forms",
    component: () => import("layouts/FormsLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/FormPage.vue"),
        name: "forms",
      },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/FormsLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
        name: "login",
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/StudentsInfoPage.vue"),
        name: "studentsInfo",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
