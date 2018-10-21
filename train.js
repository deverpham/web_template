
function getUserByID(id) {
    return new Promise(resolve => {
        resolve({
            id,
            name: 'thinh'
        })
    })
}
async function loadUserDetail() {
    return await getUserByID(1)
}
(async () => {
    const detail = await loadUserDetail()
    console.log(detail)

})()