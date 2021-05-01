describe('[modVeil]', () => {

  let actNbVeils: any

  beforeEach(async () => {
    try {
      jest.resetModules()
      const { default: modVeil } = await import('./modVeil')
      actNbVeils = modVeil().actNbVeils
    } catch (e) { null }
  })

  it('actNbVeils: should disable overflow body', async () => {
    const inc = 1
    actNbVeils(inc)
    expect(document.body.style.overflow).toEqual('hidden')
  })

  it('actNbVeils: should enable overflow body', async () => {
    actNbVeils(1)

    const inc = -1
    actNbVeils(inc)
    expect(document.body.style.overflow).toEqual('')
  })

  it('actNbVeils: should disable overflow body', async () => {
    actNbVeils(1)
    actNbVeils(1)

    const inc = -1
    actNbVeils(inc)
    expect(document.body.style.overflow).toEqual('hidden')
  })
})
