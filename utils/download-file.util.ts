export async function downloadFile(url: string, fileName: string) {
  try {
    const filename = fileName.replace("zevix/", "zevix_");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al descargar el archivo");
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${filename}.pdf`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
}

export async function downloadOptimizedFile(url: string) {
  try {
    const encodedUrl = encodeURI(url); // codifica espacios y caracteres especiales

    // Extraemos el nombre del archivo desde la url (parte después de la última "/")
    const urlParts = url.split('/');
    let filename = urlParts[urlParts.length - 1];

    // Limpiamos el nombre: reemplazamos espacios por guiones bajos, y ":" por "-"
    filename = filename.replace(/\s+/g, "_").replace(/:/g, "-");

    // Forzamos la extensión .pdf por si no la tiene (opcional)
    if (!filename.toLowerCase().endsWith(".pdf")) {
      filename += ".pdf";
    }

    const response = await fetch(encodedUrl);
    if (!response.ok) throw new Error(`Error al descargar el archivo: ${response.status}`);

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
}

export const openInGoogleDrive = (url: string) => {
  const encodedUrl = encodeURIComponent(url);
  const driveViewerUrl = `https://drive.google.com/viewerng/viewer?url=${encodedUrl}`;
  window.open(driveViewerUrl, "_blank");
};
