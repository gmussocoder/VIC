class Contacto:
    def __init__(self, nombre, telefono, email):
        self.nombre = nombre
        self.telefono = telefono
        self.email = email

class Agenda:
    def __init__(self):
        self.lista_contactos = []

    def agregar_contacto(self, contacto):
        self.lista_contactos.append(contacto)
        print("Contacto agregado correctamente.")

    def ver_lista_contactos(self):
        if len(self.lista_contactos) == 0:
            print("No hay contactos en la agenda.")
        else:
            for contacto in self.lista_contactos:
                print("Nombre:", contacto.nombre)
                print("Teléfono:", contacto.telefono)
                print("Correo electrónico:", contacto.email)
                print("-----------------------")

    def buscar_contacto_por_nombre(self, nombre):
        encontrado = False
        for contacto in self.lista_contactos:
            if contacto.nombre.lower() == nombre.lower():
                print("Nombre:", contacto.nombre)
                print("Teléfono:", contacto.telefono)
                print("Correo electrónico:", contacto.email)
                encontrado = True
                break
        if not encontrado:
            print("El contacto no se encuentra en la agenda.")

    def eliminar_contacto(self, nombre):
        encontrado = False
        for contacto in self.lista_contactos:
            if contacto.nombre.lower() == nombre.lower():
                self.lista_contactos.remove(contacto)
                print("Contacto eliminado correctamente.")
                encontrado = True
                break
        if not encontrado:
            print("El contacto no se encuentra en la agenda.")

# Programa principal
agenda = Agenda()

while True:
    print("===== GESTIÓN DE AGENDA DE CONTACTOS =====")
    print("1. Agregar un contacto")
    print("2. Ver la lista de contactos")
    print("3. Buscar un contacto por nombre")
    print("4. Eliminar un contacto")
    print("5. Salir")
    opcion = input("Elige una opción: ")