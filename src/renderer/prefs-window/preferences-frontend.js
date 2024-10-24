window.addEventListener('load', () => {
    console.log("Ventana preference")
    cancelButton()
})

function cancelButton() {
    const cancelButton = document.getElementById('cancel-button')
    
    cancelButton.addEventListener('click', () => {
        console.log("CANCELAR")
        window.close()
    })
}