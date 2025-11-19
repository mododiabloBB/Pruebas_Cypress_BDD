Feature: Gestión de cursos
    Como usuario del sistema
    Quiero gestionar todo el flujo de mis cursos
    Para guardar y usar estas en procesos institucionales

    Background:
        Given El usuario ha iniciado sesión en el sistema correctamente
        When El usuario navega a la página de "Cursos" financieros

    Scenario Outline: Validacción de creación y edición de cursos
        And El usuario hace clic en <Accion>
        And El usuario completa los campos del modal para <Accion>
        And El usuario envía el formulario y se muestra una aletar exitosa por la modificación
        Then La <Accion> ejecutada se guardar de forma correcta en la plataforma


    Examples:
            | Accion |
            | Crear  |
            | Editar | 

    Scenario: Eliminación exitosa de un curso
        And El usuario busca el curso editado "Curso BDD - Editado"
        And El usuario hace clic en la acción de "Eliminar" asignatura
        Then El usuario acepta la eliminación y se muestra una aletar de éxito "El registro fue eliminado exitosamente"
