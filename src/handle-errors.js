const { app, dialog } = require('electron');

async function relaunchApp(win) {
  try {
    await dialog.showMessageBox(win, {
      type: 'error',
      title: 'Error de Aplicación',
      message: 'Ocurrió un error inesperado, se reiniciará el aplicativo',
      buttons: ['Aceptar'],
      defaultId: 0
    });
    
    app.relaunch();
    app.exit(0);
  } catch (error) {
    console.error('Error al reiniciar la aplicación:', error);
  }
}

function setupErrors(win) {
  // Manejo de crash del proceso de renderizado
  win.webContents.on('crashed', async (event, killed) => {
    console.error('Proceso de renderizado crasheado:', { killed });
    await relaunchApp(win);
  });

  // Manejo de ventana no responsiva
  win.on('unresponsive', async () => {
    try {
      const response = await dialog.showMessageBox(win, {
        type: 'warning',
        title: 'Aplicación No Responde',
        message: 'Un proceso está tardando demasiado',
        detail: 'Puede esperar o reiniciar el aplicativo manualmente',
        buttons: ['Esperar', 'Reiniciar'],
        defaultId: 0,
        cancelId: 0
      });

      if (response.response === 1) {
        await relaunchApp(win);
      }
    } catch (error) {
      console.error('Error al mostrar diálogo:', error);
    }
  });

  // Manejo de excepciones no capturadas
  process.on('uncaughtException', async (error) => {
    console.error('Excepción no capturada:', error);
    await relaunchApp(win);
  });

  // Nuevo: Manejo de rechazos de promesas no capturados
  process.on('unhandledRejection', async (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
    await relaunchApp(win);
  });

  // Nuevo: Manejo de errores del proceso principal
  app.on('render-process-gone', async (event, webContents, details) => {
    console.error('Proceso de renderizado terminado:', details);
    await relaunchApp(win);
  });
}

module.exports = setupErrors;

