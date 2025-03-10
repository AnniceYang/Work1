import Layout from "@/page/index/";

export default [
  {
    path: "/info",
    component: Layout,
    redirect: "/info/index",
    children: [
      {
        path: "index",
        name: "personal Information",
        component: () =>
          import(/* webpackChunkName: "page" */ "@/views/admin/user/info"),
      },
    ],
  },
];
