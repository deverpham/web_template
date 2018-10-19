const admin = new RouterAPI('admin');
admin.get('/', (req, res) => {
    res.send('admin page')
})