import { Property } from '@vue/compiler-core'

export default (): { props: Property[], needRuntime: boolean } => {
  return {
    props: [],
    needRuntime: true
  }
}
