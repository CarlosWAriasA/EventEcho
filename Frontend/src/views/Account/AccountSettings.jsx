import { useState } from "react";

function AccountSettings() {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    age: "",
    description: "",
  });

  return (
    <main className="bg-white h-full text-black pt-10 pl-16">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg " style={{ fontSize: "45px" }}>
          Configuración de la Cuenta
        </h2>
        <div className="w-16 h-3 bg-yellow-400 rounded-sm"></div>
      </div>
      <div className="flex">
        <div className="mt-14" style={{ width: "50%" }}>
          <div className="flex gap-20">
            <div className="flex flex-col w-64">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Nombre"
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col w-80">
              <label>Email</label>
              <input
                className="border p-2 rounded-md border-gray-500"
                placeholder="Email"
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex gap-20 mt-5">
            <div className="flex flex-col w-64">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Contraseña"
                type="password"
              />
            </div>
            <div className="flex flex-col w-32">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Edad"
                type="number"
                value={user.age}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, age: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col w-80">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Descripcion"
                rows={5}
                value={user.description}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-blue-950 p-2 pl-5 pr-5 rounded-lg text-white hover:bg-blue-900">
              Guardar Cambios
            </button>
          </div>
        </div>
        <div className="ml-20 flex flex-col align-middle content-center">
          <img
            alt="imagen usuario"
            src="/images/default-image.jpg"
            width={240}
            style={{ height: "220px", maxHeight: "400px", borderRadius: "50%" }}
          />
          <div className="mt-8">
            <button
              style={{ borderWidth: "3px" }}
              className="border border-blue-950 p-2 pl-16 ml-2 pr-16 rounded-lg hover:bg-blue-950 hover:text-white"
            >
              Eliminar Foto
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountSettings;
