export function parseContacts(contacts = []) {
    let contactLen = contacts.length
    let parsedContacts = []
    for (let i = 0; i < contactLen; i++) {
        parsedContacts.push(parseContact(contacts[i]))
    }
    return parsedContacts
}

function parseContact(contact = {}) {
    let parsedContact = {
        gender: contact.gender || '',
        fullName: contact.name && capitalize(`${contact.name.first || ''} ${contact.name.last || ''}`) || '',
        address: getAddress(contact.location),
        email: contact.email || '',
        dob: contact.dob,
        phone: contact.phone || '',
        cell: contact.cell || '',
        id: contact.id && contact.id.value || '',
        picture: contact.picture,
        nationality: contact.nat
    }
    return parsedContact
}

function getAddress(location = {}) {
    let address = [
        location.street || '',
        location.city || '',
        location.state || '',
        location.postcode || ''
    ]
    return address.join(', ')
}
function capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
}
