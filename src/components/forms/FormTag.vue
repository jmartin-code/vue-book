<template>
  <form
    @submit.prevent="submit"
    :event="event"
    :ref="name"
    class="needs-validation"
    novalidate
    :method="method"
    :action="action"
    autocomplete="off"
  >
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "FormTag",
  props: ["action", "method", "name", "event"],
  methods: {
    submit() {
      const myForm = this.$refs[this.$props.name];

      if (myForm.checkValidity()) {
        this.$emit(this.$props["event"]);
      }
      myForm.classList.add("was-validated");
    },
  },
};
</script>
