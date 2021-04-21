export default {
  slots: {
    default: `
      <li class="slide">slide1</li>
      <li class="slide">slide2</li>
      <li class="slide">slide3</li>
    `,
  },
  props: {
    isCross: false,
    isInfinite: false,
    hasNavigation: false,
    pagination: 'none',
  },
}
