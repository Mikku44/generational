import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/ourservice","routes/ourservice.tsx"),
    route("/inventory","routes/inventory.tsx"),
    route("/ourteam","routes/ourteam.tsx"),
    route("/contact","routes/contact.tsx"),
    route("/curation-philosyphy","routes/curation-philosophy.tsx"),

    route("/admin","routes/admin/dashboard.tsx"),
    route("/login","routes/admin/login.tsx"),
    route("/admin/inventory/list","routes/admin/inventory/list.tsx"),

] satisfies RouteConfig;
