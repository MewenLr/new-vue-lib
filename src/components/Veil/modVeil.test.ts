describe('[modVeil]', () => {

  let updateNbVeils: any

  beforeEach(async () => {
    try {
      jest.resetModules()
      const { default: modVeil } = await import('./modVeil')
      updateNbVeils = modVeil().updateNbVeils
    } catch (e) { null }
  })

  it('updateNbVeils: should disable overflow body', async () => {
    const inc = 1
    updateNbVeils(inc)
    expect(document.body.style.overflow).toEqual('hidden')
  })

  it('updateNbVeils: should enable overflow body', async () => {
    updateNbVeils(1)

    const inc = -1
    updateNbVeils(inc)
    expect(document.body.style.overflow).toEqual('')
  })

  it('updateNbVeils: should disable overflow body', async () => {
    updateNbVeils(1)
    updateNbVeils(1)

    const inc = -1
    updateNbVeils(inc)
    expect(document.body.style.overflow).toEqual('hidden')
  })
})
