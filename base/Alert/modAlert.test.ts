describe('[modAlert]', () => {

  let addToStack: any
  let removeFromStack: any
  let stackAlertLocal: any
  let stackAlertGlobal: any

  beforeEach(async () => {
    try {
      jest.resetModules()
      const { default: modAlert } = await import('./modAlert')
      addToStack = modAlert().addToStack
      removeFromStack = modAlert().removeFromStack
      stackAlertLocal = modAlert().stackAlertLocal
      stackAlertGlobal = modAlert().stackAlertGlobal
    } catch (e) { /* */ }
  })

  it('addToStack: should update stackAlertGlobal', async () => {
    const id = 123
    const position = 'dummy-position'
    addToStack('global', id, position)
    expect(stackAlertGlobal.value.length).toEqual(1)
    expect(stackAlertGlobal.value[0]).toMatchObject({ id, position })
  })

  it('addToStack: should update stackAlertLocal', async () => {
    const id = 123
    const position = 'dummy-position'
    addToStack('local', id, position)
    expect(stackAlertLocal.value.length).toEqual(1)
    expect(stackAlertLocal.value[0]).toMatchObject({ id, position })
  })

  it('removeFromStack: should update stackAlertGlobal', async () => {
    const index = 0
    addToStack('global', 123, 'dummy-position')
    removeFromStack('global', index)
    expect(stackAlertGlobal.value.length).toEqual(0)
  })

  it('removeFromStack: should update stackAlertLocal', async () => {
    const index = 0
    addToStack('local', 123, 'dummy-position')
    removeFromStack('local', index)
    expect(stackAlertLocal.value.length).toEqual(0)
  })
})
