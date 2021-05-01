<template>
  <!-- Alert -->

  <hr>

  <h2>Alert</h2>

  <button
    class="home__btn"
    @click="showAlert"
  >
    Show Alert
  </button>

  <br>

  <transition name="fade">
    <Alert
      :alert="{
        title: 'Dummy alert 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis interdum est, eu dictum orci pellentesque varius.',
      }"
      v-if="isAlertVisible"
    />
  </transition>

  <br>

  <!-- List Alert -->

  <hr>

  <h2>List Alert</h2>

  <div>
    <button
      class="home__btn"
      @click="addAlert"
    >
      Add Alert
    </button>
    &nbsp;
    <button
      class="home__btn"
      @click="removeAlert"
    >
      Remove Alert
    </button>
  </div>

  <br>

  Number alerts: {{ alerts.length }}

  <ListAlert>
    <transition-group name="slide-fade-right">
      <Alert
        :alert="alert"
        :key="alert.title"
        v-for="alert in alerts"
      />
      <span key="transition-placeholder" />
    </transition-group>
  </ListAlert>

  <br>

  <!-- Cta -->

  <hr>

  <h2>Cta</h2>

  <Cta
    tag="button"
    @click="test"
  >
    Cta button
  </Cta>

  <br>

  <Cta tag="div">
    Cta div
  </Cta>

  <br>

  <Cta
    tag="link"
    :to="{ name: 'dummyChild' }"
  >
    Cta router-link
  </Cta>

  <br>

  <Cta
    tag="anchor"
    to="https://www.google.com/"
  >
    Cta anchor
  </Cta>

  <br>

  <!-- Checkbox -->

  <hr>

  <h2>Checkbox</h2>

  Toggle checkbox: {{ toggleCheckbox }}

  <br><br>

  <Checkbox
    id="toggleCheckbox"
    label="Toggle Checkbox"
    value="toggleCheckbox"
    v-model="toggleCheckbox"
  />

  <br><br>

  Dual checkbox: {{ dualCheckbox }}

  <br><br>

  <Checkbox
    label="Fizz"
    value="Fizz"
    id="checkbox-fizz"
    label-position="right"
    v-model="dualCheckbox"
  />
  <br>
  <Checkbox
    label="Buzz"
    value="Buzz"
    id="checkbox-buzz"
    label-position="right"
    v-model="dualCheckbox"
  />

  <br>

  <!-- Radio -->

  <hr>

  <h2>Radio</h2>

  Dual radio: {{ dualRadio }}

  <br><br>

  <Radio
    label="Fizz"
    value="Fizz"
    id="radio-fizz"
    v-model="dualRadio"
  />

  <br>

  <Radio
    label="Buzz"
    value="Buzz"
    id="radio-buzz"
    label-position="right"
    v-model="dualRadio"
  />

  <br>

  <!-- Toggle -->

  <hr>

  <h2>Toggle</h2>

  Toggle: {{ toggle }}

  <br><br>

  <Toggle
    id="toggle"
    label="Toggle"
    value="toggle"
    v-model="toggle"
  />

  <br>

  <!-- Input -->

  <hr>

  <h2>Input</h2>

  Input value: {{ inputValue }}

  <br><br>

  <Input
    reversed
    id="input"
    icon="placeholder"
    v-model="inputValue"
  />

  <br>

  <Input
    id="input-action"
    icon="placeholder"
    :action="{
      icon: 'placeholder',
    }"
    v-model="inputValue"
    @click="test"
  />

  <br>

  <Input
    reversed
    icon="placeholder"
    id="input-action-reversed"
    placeholder="Enter something"
    style="width: 250px;"
    :action="{
      reversed: true,
      icon: 'placeholder',
    }"
    v-model="inputValue"
    @click="test"
  />

  <br>

  <!-- Input Error -->

  <hr>

  <h2>Input Error</h2>

  <Input
    reversed
    id="input-error"
    icon="placeholder"
    v-model="inputValue"
  />

  <InputError
    immediate
    id="input-error"
    :value="inputValue"
    :validator="errorValidator"
  />

  <br>

  <!-- Form -->

  <hr>

  <h2>Form</h2>

  <Form
    id="dummyForm"
    @submit="test"
    @error="testError"
  >
    <FormGroup
      label-position="top"
      label="Form Group Toggle"
      group-for="form-group-toggle"
      :value="toggleCheckbox"
      :validator="{
        required: true,
        msg: 'Checkbox is required',
      }"
    >
      <Checkbox
        id="form-group-toggle"
        label="Toggle Checkbox"
        value="toggleCheckbox"
        v-model="toggleCheckbox"
      />
    </FormGroup>

    <br>

    <FormGroup
      label-position="right"
      label="Form Group Reversed"
      group-for="form-group-reversed"
      :value="inputValue"
      :validator="errorValidator"
    >
      <Input
        style="
          width: 250px;
          margin-right: 50px;
        "
        icon="placeholder"
        id="form-group-reversed"
        :action="{ icon: 'placeholder' }"
        v-model="inputValue"
        @click="test"
      />
    </FormGroup>

    <br>

    <FormGroup
      immediate
      label="Form Group"
      group-for="form-group"
      :value="inputValue"
      :validator="errorValidator"
    >
      <Input
        id="form-group"
        icon="placeholder"
        v-model="inputValue"
        @click="test"
      />
    </FormGroup>
  </Form>

  <Cta
    tag="button"
    type="submit"
    form="dummyForm"
  >
    Submit
  </Cta>
  <br>

  <!-- Tabs -->

  <hr>

  <h2>Tabs</h2>

  <Tabs>
    <Tab title="Tab 1">
      Hello from Tab 1
    </Tab>
    <Tab title="Tab 2">
      Hello from Tab 2
    </Tab>
    <Tab title="Tab 3">
      Hello from Tab 3
    </Tab>
  </Tabs>

  <br>

  <!-- Modal -->

  <hr>

  <h2>Modal</h2>

  <button @click="toggleVisible(true)">
    Show Modal
  </button>

  <Modal :opened="isModalVisible">
    <template #header>
      <h2>
        Title Modal
      </h2>
    </template>
    Modal component
    <template #footer>
      <button
        style="margin-right: 20px;"
        @click="toggleVisibleModal2(!isModal2Visible)"
      >
        Open
      </button>
      <button @click="toggleVisible(!isModalVisible)">
        Close
      </button>
    </template>
  </Modal>

  <Modal
    animation="slide-fade-right"
    :opened="isModal2Visible"
  >
    <template #header>
      <h2>
        Title Modal 2
      </h2>
    </template>
    Modal 2 component
    <template #footer>
      <button @click="toggleVisibleModal2(!isModal2Visible)">
        Close
      </button>
    </template>
  </Modal>

  <br>

  <!-- Title -->

  <hr>

  <h2>Title</h2>

  <Title tag="h1">
    h1 Title
  </Title>

  <Title tag="h2">
    h2 Title
  </Title>

  <Title tag="h3">
    h3 Title
  </Title>

  <br>

  <!-- ListItems -->

  <hr>

  <h2>List Items</h2>

  <ListItems tag="h1">
    <Item
      tag="button"
      :item="{
        fizz: 'Fizz',
        buzz: 'Buzz',
      }"
      @click="handleClickItem"
    >
      Item Button
    </Item>
    <Item tag="div">
      Item Div
    </Item>
    <Item
      tag="link"
      :to="{ name: 'dummyChild' }"
    >
      Item Link
    </Item>
    <Item
      tag="anchor"
      to="https://www.google.com/"
    >
      Item Anchor
    </Item>
  </ListItems>

  <br>

  <!-- ScrollBar -->

  <hr>

  <h2>Scroll Bar</h2>

  <ScrollBar
    style="
      width: 400px;
      height: 200px;
      background-color: lightgrey;
    "
  >
    Paragraph 1<br>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
    officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
    <br><br>
    Paragraph 2<br>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
    officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
    <br><br>
    Paragraph 3<br>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
    officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
    <br><br>
    Paragraph 4<br>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
    officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
    <br><br>
    Paragraph 5<br>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
    officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
  </ScrollBar>

  <br>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cta from '@/components/Cta/Cta.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import Form from '@/components/Form/Form.vue'
import Tab from '@/components/Tabs/Tab/Tab.vue'
import Alert from '@/components/Alert/Alert.vue'
import Input from '@/components/Input/Input.vue'
import Modal from '@/components/Modal/Modal.vue'
import Radio from '@/components/Radio/Radio.vue'
import Title from '@/components/Title/Title.vue'
import Toggle from '@/components/Toggle/Toggle.vue'
import Item from '@/components/ListItems/Item/Item.vue'
import ListAlert from '@/components/Alert/ListAlert.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import FormGroup from '@/components/FormGroup/FormGroup.vue'
import ListItems from '@/components/ListItems/ListItems.vue'
import ScrollBar from '@/components/ScrollBar/ScrollBar.vue'
import InputError from '@/components/InputError/InputError.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Cta,
    Tab,
    Tabs,
    Item,
    Form,
    Alert,
    Input,
    Modal,
    Radio,
    Title,
    Toggle,
    Checkbox,
    FormGroup,
    ListAlert,
    ListItems,
    ScrollBar,
    InputError,
  },
  setup() {

    const test = () => { console.info('test') }
    const testError = () => { console.info('test error') }

    /* alerts */

    const alerts = ref<{ title: string, description: string }[]>([])

    const isAlertVisible = ref<boolean>(false)

    function showAlert() {
      return isAlertVisible.value = !isAlertVisible.value
    }

    function addAlert() {
      return alerts.value.push({
        title: `Dummy ${alerts.value.length + 1}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis interdum est, eu dictum orci pellentesque varius.',
      })
    }

    function removeAlert() {
      return alerts.value.shift()
    }

    /* checkbox */

    const toggleCheckbox = ref<boolean>(false)
    const dualCheckbox = ref<string[]>(['Fizz', 'Buzz'])

    /* radio */

    const dualRadio = ref<string>('Fizz')

    /* toggle */

    const toggle = ref<boolean>(false)

    /* input */

    const inputValue = ref<string|null>(null)

    /* input error */

    const errorValidator = ref<Record<string, unknown>>({
      msg: 'Default error message',
      // required: true,
      required: { test: true, msg: 'Required error message' },
      // min: 3,
      min: { test: 3, msg: 'Min error message' },
      // max: 8,
      max: { test: 8, msg: 'Max error message' },
      // regex: /[A-Z]/g,
      regex: { test: /[A-Z]/g, msg: 'Regex error message' },
      // custom: (value: string): boolean => {
      //   if (typeof value === 'string') return value.includes('s')
      //   return false
      // },
      custom: {
        test: (value: string): boolean => {
          if (typeof value === 'string') return value.includes('s')
          return false
        },
        msg: 'Custom error message',
      },
    })

    /* modal */

    const isModalVisible = ref<boolean>(false)

    const isModal2Visible = ref<boolean>(false)

    const toggleVisible = (isVisible: boolean) => isModalVisible.value = isVisible

    const toggleVisibleModal2 = (isVisible: boolean) => isModal2Visible.value = isVisible

    /* list items */

    const handleClickItem = (item: object) => console.info('item >', item)

    return {
      test,
      testError,
      /* alert */
      alerts,
      addAlert,
      showAlert,
      removeAlert,
      isAlertVisible,
      /* checkbox */
      dualCheckbox,
      toggleCheckbox,
      /* radio */
      dualRadio,
      /* toggle */
      toggle,
      /* input */
      inputValue,
      /* input error */
      errorValidator,
      /* modal */
      isModalVisible,
      isModal2Visible,
      toggleVisible,
      toggleVisibleModal2,
      /* list items */
      handleClickItem,
    }
  },
})
</script>

<style>
@import url('../../styles/animations.css');

.home__btn {
  padding: 5px;
  background-color: lightgrey;
}
</style>
