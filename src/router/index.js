import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EmployeeView from "../views/Employee/View.vue";
import EmployeeCreate from "../views/Employee/Create.vue";
import EmployeeEdit from "../views/Employee/Edit.vue";
import EmployeeDetail from "../views/Employee/Detail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/employee",
      name: "employee",
      component: EmployeeView,
    },
    {
      path: "/employee/create",
      name: "employeeCreate",
      component: EmployeeCreate,
    },
    {
      path: "/employee/:id/edit",
      name: "employeeEdit",
      component: EmployeeEdit,
    },
    {
      path: "/employee/:id/detail",
      name: "employeeDetail",
      component: EmployeeDetail,
    },
  ],
});

export default router;
