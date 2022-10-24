<template>
  <div class="form-check">
    <input
      class="form-check-input"
      :checked="checked"
      :required="required"
      :value="value"
      type="checkbox"
    />
    <label :for="name" class="form-check-label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckInput",
  props: ["checked", "label", "name", "value", "required"],
};
</script>
