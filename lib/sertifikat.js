// generateCertificate.js

/**
 * Fetches JSON schema from a URL and generates HTML content for the certificate.
 * @param {string} url - The URL of the JSON schema.
 */
async function fetchJSONSchema(url) {
    try {
        const response = await fetch(url);
        const jsonSchema = await response.json();
        generateCertificate(jsonSchema);
    } catch (error) {
        console.error('Error fetching JSON schema:', error);
    }
}

/**
 * Generates HTML for the certificate based on JSON schema.
 * @param {object} data - The JSON schema object.
 */
function buatSertifikat(data) {
    const settings = data.settings[0];
    const background = settings.background;
    const width = settings.width;
    const height = settings.height;

    // Start generating HTML
    let html = `
        <div class="certificate relative" style="background-image: url('${background}'); background-size: cover; width: ${width}px; height: ${height}px;">
    `;

    // Render components
    data.components.forEach(component => {
        if (component.visible) {
            html += `<div class="${component.style || ''}">`;

            switch (component.type) {
                case 'image':
                    html += `<img src="${component.value}" alt="${component.name}" class="w-full h-auto">`;
                    break;
                case 'text':
                    html += `<p>${component.value}</p>`;
                    break;
                case 'qr':
                    // Placeholder for QR code rendering
                    html += `<div class="qr-code-placeholder">${component.value}</div>`;
                    break;
            }

            html += '</div>';
        }
    });

    // Render attributes
    data.attributes.forEach(attribute => {
        if (attribute.status) {
            html += `<div class="${attribute.style || ''}">`;
            html += `<p><strong>${attribute.name}:</strong> ${attribute.value}</p>`;
            html += '</div>';
        }
    });

    // Close certificate container
    html += '</div>';

    // Inject HTML into the container
    document.getElementById('certificate-container').innerHTML = html;
}

// Export functions
module.exports = {
    fetchJSONSchema,
    buatSertifikat
};
