import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("/ourservice", "routes/ourservice.tsx"),
        route("/inventory", "routes/inventory.tsx"),
        route("/inventory/:slug", "routes/inventoryDetail.tsx"),
        route("/ourteam", "routes/ourteam.tsx"),
        route("/contact", "routes/contact.tsx"),
        route("/curation-philosyphy", "routes/curation-philosophy.tsx"),
    ]),
    


    route("/login", "routes/admin/login.tsx"),
    layout("routes/admin/layout.tsx", [
        route("/admin", "routes/admin/dashboard.tsx"),
        route("/admin/inventory", "routes/admin/inventory/list.tsx"),
        route("/admin/contact", "routes/admin/contact.tsx"),
    ]),


] satisfies RouteConfig;
