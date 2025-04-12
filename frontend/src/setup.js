import * as W3upClient from '@web3-storage/w3up-client'

const email = 'gamingvk094@gmail.com'

const client = await W3upClient.create()
await client.login(email)

// Choose an existing space, or create a new one
const space = await client.createSpace('my-password-space')
await client.setCurrentSpace(space.did())

console.log('Your space DID:', space.did())
