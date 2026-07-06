// Basic delete
await scalekit.role.deleteRole('admin')

// With reassignment
await scalekit.role.deleteRole('admin', 'member')
