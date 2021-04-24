<template>
  <div class="index">
    <img
      class="index__logo"
      alt="logo of library"
      src="@/assets/images/logo.png"
    >

    <!-- Title -->
    <div class="index__component">
      <div class="index__title">
        Title
      </div>
      <Title style="margin-bottom: 20px;">
        Title
      </Title>
      <Title tag="h2">
        SubTitle
      </Title>
    </div>

    <!-- SvgIcon -->
    <div class="index__component">
      <div class="index__title">
        SvgIcon
      </div>
      <SvgIcon
        icon="placeholder"
        style="
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 20px;
        "
      />
      <SvgIcon
        icon="placeholder"
        variant="tertiary"
        style="width: 1.5rem; height: 1.5rem;"
      />
    </div>

    <!-- Bond -->
    <div class="index__component">
      <div class="index__title">
        Bond
      </div>
      <Bond
        variant="primary"
        to="https://google.com"
        style="margin-right: 10px;"
      >
        External
      </Bond>
      <Bond
        reversed
        variant="secondary"
        icon="placeholder"
        style="margin-right: 10px;"
        :to="{ name: 'fakeChild' }"
      >
        Internal
      </Bond>
    </div>

    <!-- ProgressBar -->
    <div class="index__component">
      <div class="index__title">
        ProgressBar
      </div>
      <ProgressBar :progression="35" />
    </div>

    <!-- Button -->
    <div class="index__component">
      <div class="index__title">
        Button
      </div>
      <Button
        size="small"
        variant="primary"
        style="margin-right: 10px;"
      >
        Button
      </Button>
      <Button
        reversed
        outlined
        size="medium"
        variant="secondary"
        icon="placeholder"
        style="margin-right: 10px;"
        @click="handleEvent"
      >
        Button
      </Button>
      <Button
        disabled
        size="large"
        variant="secondary"
        style="margin-right: 10px;"
      >
        Button
      </Button>
    </div>

    <!-- Checkbox -->
    <div class="index__component">
      <div class="index__title">
        Checkbox
      </div>
      <div class="index__model">
        v-model: {{ testList }}
      </div>
      <LabelInput
        label-for="testCheckbox"
        label="Label checkbox"
        label-position="top"
        style="
          display: flex;
          margin-bottom: 20px;
        "
      >
        <div style="display: flex">
          <Checkbox
            label-for
            value="Test"
            id="testCheckbox"
            label="Test label"
            label-position="left"
            style="margin-right: 10px;"
            v-model="testList"
          />
          <Checkbox
            label-for
            value="Test2"
            id="test2Checkbox"
            label="Test2 label"
            style="margin-left: 10px;"
            v-model="testList"
          />
        </div>
      </LabelInput>
      <br>
      <div class="index__model">
        v-model: {{ testToggle }}
      </div>
      <Checkbox
        label-for
        value="TestBoolean"
        id="testBooleanCheckbox"
        label="Boolean label"
        style="
          margin-top: 10px;
          margin-right: 10px;
        "
        :validators="validators.checkbox"
        v-model="testToggle"
      />
    </div>

    <!-- Radio -->
    <div class="index__component">
      <div class="index__title">
        Radio
      </div>
      <div class="index__model">
        v-model: {{ testValue }}
      </div>
      <Radio
        label-for
        value="Test"
        id="testRadio"
        label="Test label"
        label-position="left"
        style="margin-right: 10px;"
        v-model="testValue"
      />
      <Radio
        label-for
        value="Test2"
        id="test2Radio"
        label="Test2 label"
        style="margin-right: 10px;"
        v-model="testValue"
      />
    </div>

    <!-- Toggle -->
    <div class="index__component">
      <div class="index__title">
        Toggle
      </div>
      <div class="index__model">
        v-model: {{ testToggle }}
      </div>
      <Toggle
        label-for
        value="Test"
        id="testToggle"
        label="Test label"
        label-position="left"
        style="margin-right: 10px;"
        v-model="testToggle"
      />
    </div>

    <!-- Chip -->
    <div class="index__component">
      <div class="index__title">
        Chip
      </div>
      <Chip
        label="Test"
        variant="primary"
        style="margin-bottom: 20px;"
        @close="handleEvent"
      />
      <Chip
        closable
        label="Test lorem est blablabla"
        variant="secondary"
        @close="handleEvent"
      />
    </div>

    <!-- Transition -->
    <div class="index__component">
      <div class="index__title">
        Transition
      </div>
      <button
        style="margin-bottom: 20px;"
        @click="toggleFakeTransition()"
      >
        Transition
      </button>
      <Animate
        name="slide-right"
        @before-in="beforeEnter"
      >
        <div v-if="fakeTransitionVisible">
          Slide transition
        </div>
      </Animate>
    </div>

    <!-- ListItems -->
    <div class="index__component">
      <div class="index__title">
        ListItems
      </div>
      <div class="index__model">
        No-access
      </div>
      <ListItems
        no-access
        style="
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
        "
        :items="[
          'Test',
          'Test2',
          'Test3',
          'Test4',
          'Test5',
          'Test6',
          'Test7',
        ]"
        :item-selected="testValue"
        @click="handleEvent"
      />
      <div class="index__model">
        Items string
      </div>
      <ListItems
        style="
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
        "
        :items="[
          'Test',
          'Test2',
          'Test3',
          'Test4',
          'Test5',
          'Test6',
          'Test7',
        ]"
        :item-selected="testValue"
        @click="handleEvent"
      />
      <div class="index__model">
        Items object
      </div>
      <ListItems
        :items="[
          {
            label: 'test1',
          },
          {
            label: 'test2',
            value: 'TEST2',
          },
          {
            label: 'test3',
            value: 'TEST3',
          },
        ]"
        style="
          width: 200px;
          margin-bottom: 20px;
        "
        :item-selected="{ label: 'test2', value: 'TEST2' }"
        @click="handleEvent"
      />
      <div class="index__model">
        Items external bond
      </div>
      <ListItems
        :items="[
          {
            label: 'test1',
            to: 'https://www.google.com/',
          },
          {
            label: 'test2',
            to: 'https://www.google.com/',
          },
          {
            label: 'test3',
            to: 'https://www.google.com/',
          },
        ]"
        style="
          width: 200px;
          margin-bottom: 20px;
        "
        @click="handleEvent"
      />
      <div class="index__model">
        Items internal bond
      </div>
      <ListItems
        :items="[
          {
            label: 'test1',
            to: { name: 'fake' },
          },
          {
            label: 'test2',
            to: { name: 'fakeChild' },
          },
          {
            label: 'test3',
            to: { name: 'fakeChild' },
          },
        ]"
        style="
          width: 200px;
          margin-bottom: 20px;
        "
        @click="handleEvent"
      />
      <div class="index__model">
        Items mixed
      </div>
      <ListItems
        :items="[
          'test',
          {
            label: 'test1',
            value: 'TEST1'
          },
          {
            label: 'test2',
            to: 'https://www.google.com/',
          },
          {
            label: 'Test2',
            to: { name: 'fakeChild' },
          },
        ]"
        style="
          width: 200px;
          margin-bottom: 20px;
        "
        @click="handleEvent"
      />
    </div>

    <!-- InputDrop -->
    <div class="index__component">
      <div class="index__title">
        InputDrop
      </div>
      <LabelInput
        label-for="input-drop"
        label="Label input drop"
        label-position="top"
        style="margin-bottom: 20px;"
      >
        <InputDrop
          searchable
          id="input-drop"
          style="width: 500px;"
          clear-label="Supprimer sélection"
          :items="[
            { label: 'Test' },
            { label: 'Test2' },
            { label: 'Test3' },
            { label: 'Test4' },
            { label: 'Test5' },
            { label: 'Test6' },
          ]"
          v-model="testObject"
          @close="handleEvent"
          @click-item="handleEvent"
        />
      </LabelInput>
      <InputDrop
        id="input-drop2"
        style="margin-bottom: 20px;"
        :items="[
          'Test',
          'Test2',
          'Test3',
          'Test4',
          'Test5',
          'Test6',
          'Test7',
        ]"
        :closable="false"
        :validators="validators.dropInput"
        v-model="testValue"
        @close="handleEvent"
        @click-item="handleEvent"
      />
    </div>

    <!-- Input -->
    <div
      class="index__component"
      style="
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      "
    >
      <div
        class="index__title"
        style="width: 100%;"
      >
        Input
      </div>
      <Input
        id="test1"
        icon="placeholder"
        style="
          width: 200px;
          margin-bottom: 20px;
        "
        :validators="validators.name"
        v-model="testValue"
      />
      <Input
        reversed
        id="test2"
        icon="placeholder"
        style="
          width: 200px;
          margin-bottom: 20px;
        "
        v-model="testValue"
      />
      <Input
        required
        id="test3"
        icon="placeholder"
        placeholder="Test placeholder"
        style="
          width: 100%;
          margin-bottom: 20px;
        "
        v-model.trim="testValue"
      />
      <Input
        required
        id="test4"
        icon="placeholder"
        error-flow="blurred"
        label-action="test 4"
        icon-action="placeholder"
        placeholder="Test placeholder"
        style="width: 500px;"
        :reversed-action="true"
        :validators="validators.name"
        v-model.trim="testValue"
        @click="handleEvent($event)"
      />
    </div>

    <!-- Modal -->
    <div class="index__component">
      <div class="index__title">
        Modal
      </div>
      <button @click="toggleVisible(true)">
        Show Modal
      </button>

      <Modal :opened="isModalVisible">
        <template #header>
          <Title>
            Title Modal
          </Title>
        </template>
        Modal component
        <template #footer>
          <Button
            style="margin-right: 20px;"
            @click="toggleVisibleModal2(!isModal2Visible)"
          >
            Open
          </Button>
          <Button @click="toggleVisible(!isModalVisible)">
            Close
          </Button>
        </template>
      </Modal>

      <Modal
        animation="slide-right"
        :opened="isModal2Visible"
      >
        <template #header>
          <Title>
            Title Modal
          </Title>
        </template>
        Modal 2 component
        <template #footer>
          <Button @click="toggleVisibleModal2(!isModal2Visible)">
            Close
          </Button>
        </template>
      </Modal>
    </div>

    <!-- Carousel -->
    <div class="index__component">
      <div class="index__title">
        Carousel
      </div>
      <Carousel
        is-infinite
        has-navigation
        pagination="dash"
        style="
          left: 50%;
          width: 40%;
          position: relative;
          transform: translateX(-50%);
        "
        v-if="slides.length"
      >
        <Slide
          :key="idx"
          v-for="(img, idx) in slides"
        >
          <Picture :src="img" />
        </Slide>
      </Carousel>
      <br>
      <Carousel
        has-navigation
        pagination="fraction"
        style="
          left: 50%;
          width: 40%;
          position: relative;
          transform: translateX(-50%);
        "
        v-if="slides.length"
      >
        <Slide
          :key="idx"
          v-for="(img, idx) in slides"
        >
          <Picture :src="img" />
        </Slide>
      </Carousel>
    </div>

    <!-- Alert -->
    <div class="index__component">
      <div class="index__title">
        Alert
      </div>
      <!-- <Alert
        has-icon
        closable
        :alert="globalAlerts[0]"
      /> -->
    </div>

    <!-- Tabs -->
    <div class="index__component">
      <div class="index__title">
        Tabs
      </div>
      <Tabs>
        <Tab title="Tab 1">Hello from Tab 1</Tab>
        <Tab title="Tab 2">Hello from Tab 2</Tab>
        <Tab title="Tab 3">Hello from Tab 3</Tab>
      </Tabs>
    </div>

    <!-- Form -->
    <div class="index__component">
      <div class="index__title">
        Form
      </div>
      <Form
        id="formTest"
        @error="handleEvent($event, 'error')"
        @submit="handleEvent($event, 'submit')"
      >
        <LabelInput
          label-for="test6"
          label="Label test6"
          label-position="left"
          style="margin-bottom: 20px;"
        >
          <Input
            form-input
            id="test6"
            error-flow="blurred"
            style="width: 200px;"
            :validators="validators.name"
            v-model="testValue"
          />
        </LabelInput>
        <LabelInput
          label-for="test7"
          label="Label test7"
          label-position="right"
          style="margin-bottom: 20px;"
        >
          <Input
            reversed
            form-input
            id="test7"
            icon="placeholder"
            style="width: 200px;"
            :validators="validators.name"
            v-model="testValue"
          />
        </LabelInput>
        <Checkbox
          label-for
          form-input
          id="test8"
          value="Test 8"
          label="Test 8"
          style="margin-bottom: 10px;"
          :validators="validators.checkbox"
          v-model="testToggle"
        />
        <Toggle
          label-for
          form-input
          id="test9"
          value="Test 9"
          label="Test 9"
          label-position="left"
          :validators="validators.checkbox"
          v-model="testToggle"
        />
      </Form>
      <Button
        type="submit"
        form="formTest"
        style="margin-top: 20px;"
      >
        Submit
      </Button>
    </div>

    <!-- Picture -->
    <div class="index__component">
      <div class="index__title">
        Picture
      </div>
      <Picture
        lazy
        src="desert.jpg"
        style="width: 80%;"
      />
      <Picture
        src="mountain.jpg"
        style="width: 80%;"
        placeholder="placeholder.png"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Validators } from '@/scripts/contracts/interfaces'
import Bond from '@/components/Bond/Bond.vue'
import Chip from '@/components/Chip/Chip.vue'
import Form from '@/components/Form/Form.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import Tab from '@/components/Tabs/Tab/Tab.vue'
import Alert from '@/components/Alert/Alert.vue'
import Modal from '@/components/Modal/Modal.vue'
import Title from '@/components/Title/Title.vue'
import Input from '@/components/Input/Input.vue'
import Radio from '@/components/Radio/Radio.vue'
import Toggle from '@/components/Toggle/Toggle.vue'
import Button from '@/components/Button/Button.vue'
import Animate from '@/components/Animate/Animate.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import Picture from '@/components/Picture/Picture.vue'
import Slide from '@/components/Carousel/Slide/Slide.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import ListItems from '@/components/ListItems/ListItems.vue'
import InputDrop from '@/components/InputDrop/InputDrop.vue'
import LabelInput from '@/components/LabelInput/LabelInput.vue'
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Bond,
    Chip,
    Form,
    Tab,
    Tabs,
    // Alert,
    Title,
    Input,
    Radio,
    Modal,
    Slide,
    Toggle,
    Button,
    SvgIcon,
    Picture,
    Animate,
    Carousel,
    Checkbox,
    ListItems,
    InputDrop,
    LabelInput,
    ProgressBar,
  },
  setup() {
    const testValue = ref<string|null>('Test')
    const testObject = ref<object|null>({ label: 'test' })
    const testList = ref<string[]>(['Test2'])
    const testToggle = ref<boolean>(true)

    const validators = ref<{
      name: Validators;
      checkbox: Validators;
      dropInput: Validators;
    }>({
      name: {
        msg: 'Error default message',
        required: {
          value: true,
          msg: 'Error required message',
        },
        minlength: {
          value: 3,
          msg: 'Error minlength message',
        },
        maxlength: {
          value: 5,
          msg: 'Error maxlength message',
        },
        regex: {
          value: /[A-Z]/g,
          msg: 'Error regex message',
        },
      },
      checkbox: {
        msg: 'Error checkbox is required',
        required: true,
      },
      dropInput: {
        msg: 'Error message dropInput',
        maxlength: 3,
      },
    })

    // watch(
    //   () => testValue.value,
    //   () => console.info(testValue.value),
    //   { immediate: true },
    // )

    function handleEvent(event: Event, param: any) {
      console.info('in handleEvent', event, ' & param >', param)
    }

    /* modal */

    const isModalVisible = ref<boolean>(false)
    const isModal2Visible = ref<boolean>(false)

    const toggleVisible = (isVisible: boolean) => {
      isModalVisible.value = isVisible
    }
    const toggleVisibleModal2 = (isVisible: boolean) => isModal2Visible.value = isVisible

    /* alert */

    const globalAlerts = [
      {
        title: 'Alert 1',
        variant: 'success',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod risus nibh, sed fringilla lacus malesuada et. Fusce volutpat nulla sed sapien condimentum varius.',
      },
      {
        title: 'Alert 2',
        variant: 'info',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod risus nibh, sed fringilla lacus malesuada et. Fusce volutpat nulla sed sapien condimentum varius.',
      },
      {
        title: 'Alert 3',
        variant: 'warning',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod risus nibh, sed fringilla lacus malesuada et. Fusce volutpat nulla sed sapien condimentum varius.',
      },
      {
        title: 'Alert 4',
        variant: 'error',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod risus nibh, sed fringilla lacus malesuada et. Fusce volutpat nulla sed sapien condimentum varius.',
      },
    ]

    /* carousel */

    const slides = ref<string[]>([
      'desert.jpg',
      'mountain.jpg',
      'train.jpg',
    ])

    /* transition */

    const fakeTransitionVisible = ref<boolean>(false)
    const toggleFakeTransition = () => fakeTransitionVisible.value = !fakeTransitionVisible.value
    const beforeEnter = () => console.info('before enter from parent')

    return {
      testList,
      testValue,
      testToggle,
      testObject,
      validators,
      handleEvent,

      toggleVisible,
      toggleVisibleModal2,
      isModalVisible,
      isModal2Visible,

      globalAlerts,

      slides,

      fakeTransitionVisible,
      toggleFakeTransition,
      beforeEnter,
    }
  },
})
</script>

<style lang="sass">
.index
  width: 90%
  margin: 0 auto
  padding: 20px 0
  max-width: 1440px
  min-height: 100vh
  background-color: white

  &__logo
    left: 50%
    width: 60px
    height: 60px
    position: relative
    margin-bottom: 20px
    transform: translateX(-50%)

  &__component
    padding: 0 20px
    margin-bottom: 40px

  &__title
    font-size: 20px
    margin-bottom: 20px
    padding-bottom: 10px
    border-bottom: 1px solid $tertiary

  &__model
    color: $secondary
    font-style: italic
    margin-bottom: 20px
</style>
