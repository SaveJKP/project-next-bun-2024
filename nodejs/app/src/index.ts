import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controllers/user-controller";
import { DeviceController } from "./controllers/device-controller";
import { DepartmentController } from "./controllers/department-controller";
import { SectionController } from "./controllers/section-controller";

const app = new Elysia()
  .use(cors())
  .use(jwt({
    name: "jwt",
    secret: "secret",
  }))
  .get("/", () => "Hello Elysia")
  .post("/api/user/signin", UserController.signIn)
  .put("/api/user/update", UserController.update)
  .get("/api/user/list", UserController.list)
  .post("/api/user/create", UserController.create)
  .put("/api/user/updateUser/:id", UserController.updateUser)
  .delete("/api/user/remove/:id", UserController.remove)

  // 
  // department an section
  .get("/api/department/list", DepartmentController.list)
  .get("/api/section/listByDepartment/:departmentId", SectionController.listByDepartment)

  //
  // device
  //
  .post("/api/device/create", DeviceController.create)
  .get("/api/device/list", DeviceController.list)
  .put("/api/device/update/:id", DeviceController.update)
  .delete("/api/device/remove/:id", DeviceController.remove)

  // 
  // listen
  //
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);