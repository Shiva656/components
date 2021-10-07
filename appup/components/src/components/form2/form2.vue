<template>
  <!-- Parent Div-->
  <div>
    <div v-if="formTittle" class="page-title form-container">
      <h1>{{formTittle}}</h1>
    </div>
    <b-form :id="id" class="appup-form text-left" @input="onFormInput" @reset="onReset" novalidate>
      <!-- secIndex(section Index), subSecIndex(sub section Index)  -->
      <div class="row">
        <template v-for="(section, secIndex) in formFields">
          <template v-for="(subSection, subSecIndex) in section">
            <div
              :class="no_of_columns(section.length, subSecIndex, subSection[0])"
              :key="secIndex+subSecIndex"
            >
              <div :class="getSectionClasses(subSection)">
                <template v-for="(group, index) in subSection">
                  <template v-if="tabsData">
                    <template
                      v-if="tabsData.hasOwnProperty(secIndex) && tabsData[secIndex].hasOwnProperty(subSecIndex)"
                    >
                      <b-tabs
                        v-if="tabsData[secIndex][subSecIndex].hasOwnProperty(index)"
                        :key="index"
                      >
                        <b-tab
                          v-for="(tab, ind) in tabsData[secIndex][subSecIndex][index].tabTitles"
                          :title="tabsData[secIndex][subSecIndex][index].tabTitles[ind]"
                          :key="tab+index+ind"
                          :active="tabsData[secIndex][subSecIndex][index].tabActive && (tabsData[secIndex][subSecIndex][index].tabTitles[ind] === tabsData[secIndex][subSecIndex][index].tabActive)"
                          @click="tabClicked(secIndex, subSecIndex, tabsData[secIndex][subSecIndex][index].tabGroup, tabsData[secIndex][subSecIndex][index].tabTitles[ind])"
                        ></b-tab>
                      </b-tabs>
                    </template>
                  </template>
                  <div class="row" :key="index" v-if="showInTab(secIndex, subSecIndex, group)">
                    <template v-for="(item, subIndex) in group">
                      <div
                        :class="item.class ? item.class : 'col'"
                        :key="subIndex"
                        v-if="condition(item)"
                      >
                        <b-form-group
                          :id="'fgroup_'+item.id"
                          :label-for="item.id"
                          :class="form_group_class"
                        >
                          <template v-if="item.label">
                            <label>{{item.label}}</label>
                            <span
                              v-if="item.label && item.required && !(item.required && item.required == 'false')|| item.required == 'true'"
                              class="required-star"
                              style="color: red;"
                            >*</span>
                            <span
                              v-if="item.label && item.show_info_icon && !(item.show_info_icon && item.show_info_icon == 'false')|| item.show_info_icon == 'true'"
                              class="ml-2 cursor-pointer"
                              v-b-tooltip.hover
                              :title="(item.info_icon_text)?item.info_icon_text:''"
                            >
                              <i class="far fa-info-circle text-muted"></i>
                            </span>
                            <span
                              v-if="item.label && item.show_action_icon && !(item.show_action_icon && item.show_action_icon == 'false')|| item.show_action_icon == 'true'"
                              class="float-right"
                              @click="attachHandler(item['event.action'],$event)"
                            >
                              <i
                                class="text-muted cursor-pointer"
                                v-b-tooltip.hover
                                :title="(item.action_icon_tooltip)?item.action_icon_tooltip:''"
                                :class="(item.action_icon_class)?item.action_icon_class:'fas fa-plus'"
                              ></i>
                            </span>
                          </template>
                          <!-- Date Component -->
                          <template
                            v-if=" item.type == 'date'|| item.type == 'time'|| item.type == 'datetime'|| item.type == 'daterange'"
                          >
                            <appup-datetime
                              :name="item.name"
                              :id="item.id"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                              :type="item.type"
                              :config="convert_string_to_object(item.config) ? JSON.parse(item.config):item.config"
                              :class="item.fieldClass"
                              :placeholder="item.placeholder"
                              @input="attachHandler(item['event.input'],$event)"
                              @on-change="attachHandler(item['event.change'],$event)"
                            />

                            <!-- Form Help date for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Hidden Component -->
                          <template v-else-if="item.type == 'hidden'">
                            <input :id="item.id" class="form-control appup-hidden" type="hidden" />

                            <!-- Form Help hidden for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Textarea Component -->
                          <template v-else-if="item.type == 'textarea'">
                            <b-form-textarea
                              :name="item.name"
                              :id="item.id"
                              v-model="form[item.name]"
                              :state="errors.has(item.name) ? false : null"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :placeholder="item.placeholder"
                              :disabled="item.disabled && !(item.disabled && item.disabled == 'false')|| item.disabled == 'true'"
                              :rows="item.rows"
                              :max-rows="item['max-rows']"
                              :class="item.fieldClass"
                              @input="attachHandler(item['event.input'],$event)"
                              @change.native="attachHandler(item['event.change'],$event)"
                              @focus.native="attachHandler(item['event.focus'],$event)"
                              @blur.native="attachHandler(item['event.blur'],$event)"
                              @keydown.native="attachHandler(item['event.keydown'],$event)"
                              @keyup.native="attachHandler(item['event.keyup'],$event)"
                            />

                            <!-- Form Help testarea for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                            <b-form-text
                              class="text-right"
                              v-if="item.display_charcount && form[item.name]"
                            >{{form[item.name].length}} Characters</b-form-text>
                          </template>

                          <!-- Quilljs Component -->
                          <template v-else-if="item.type == 'quilljs'">
                            <appup-quilljs
                              :name="item.name"
                              :id="item.id"
                              v-model="form[item.name]"
                              :config="convert_string_to_object(item.config) ? JSON.parse(item.config):item.config"
                              v-validate="fetchValidationRules(item)"
                              @input="manualInputTrigger"
                              :data-vv-as="item.label"
                              :placeholder="item.placeholder"
                              :state="errors.has(item.name) ? false : null"
                              :class="item.fieldClass"
                              :s3presignurl="item.s3presignurl"
                            />

                            <!-- Form Help editor for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Tinymce Component -->
                          <template v-else-if="item.type == 'tinymce'">
                            <appup-tinymce
                              :name="item.name"
                              :apiKey="item.apiKey"
                              v-model="form[item.name]"
                              :toolbar="item.toolbar"
                              :disabled="item.disabled"
                              :tag-name="item.tagName"
                              :init="item.init"
                              :id="item.id"
                              :inline="item.inline"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <!-- Form Help editor for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Radio Component -->
                          <template v-else-if="item.type == 'radio'">
                            <appup-radio
                              :name="item.name"
                              :id="item.id"
                              :addElement="addElement"
                              :options="convert_string_to_object(item.option) ? JSON.parse(item.option):item.option"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              @input="attachHandler(item['event.input'],$event)"
                              :state="errors.has(item.name) ? false : null"
                              @radioChange="dynamicAddInput"
                              :class="item.fieldClass"
															class="text-capitalize"
                            />
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Checkbox Component -->
                          <template v-else-if="item.type == 'checkbox'">
                            <appup-checkbox
                              v-show="!item.hidden"
                              :name="item.name"
                              :id="item.id"
                              :addElement="addElement"
                              :url="item.url ? item.url : null"
                              :key_value="item.key_value ? item.key_value : null"
                              :key_label="item.key_label ? item.key_label : null"
                              :options="convert_string_to_object(item.option) ? JSON.parse(item.option):item.option"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              @input="attachHandler(item['event.input'],$event)"
                              @change.native="manualInputTrigger"
                              @checkboxChange="dynamicAddInput"
                              :state="errors.has(item.name) ? false : null"
                              :class="item.fieldClass"
                            />
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- switch button  -->

                          <template v-else-if="item.type=='switch'">
                            <ac-switch-button
                              :name="item.name"
                              :id="item.id"
                              :disabled="item.disabled"
                              @change="attachHandler(item['event.change'],$event)"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            ></ac-switch-button>
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Dropdown Component -->
                          <template v-else-if="item.type == 'dropdown' || item.type == 'select'">
                            <appup-select
                              :id="item.id"
                              :name="item.name"
                              :url="item.url ? item.url : null"
                              :placeholder="item.placeholder"
                              :key_value="item.key_value ? item.key_value : null"
                              :key_label="item.key_label ? item.key_label : null"
                              :addElement="addElement"
                              :refresh_icon="item.refresh_icon"
                              :logo_height="item.logo_height"
                              :logo_width="item.logo_width"
                              :options="convert_string_to_object(item.option) ? JSON.parse(item.option):item.option"
                              v-model="form[item.name]"
                              :disabled="item.disabled && !(item.disabled && item.disabled == 'false')|| item.disabled == 'true'"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              @input="emitFormAttachHandler(item['event.input'],$event)"
                              @change="attachHandler(item['event.change'], $event)"
                              :state="errors.has(item.name) ? false : null"
                              @dropdownChange="dynamicAddInput"
                              :class="item.fieldClass"
                            />

                            <!-- Form Help dropdown for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>
                          <template v-else-if="item.type == 'ac-grouped-dropdown'">
                            <ac-grouped-dropdown
                                :name="item.name"
                                :id="item.id"
                                :variant="item.variant"
                                v-model="form[item.name]"
                                :data="convert_string_to_object(item.data) ? JSON.parse(item.data):item.data"
                                :button_options="convert_string_to_object(item.button_options) ? JSON.parse(item.button_options):item.button_options"
                                :key_label="item.key_label"
                                :key_value="item.key_value"
                                :group_key="item.group_key"
                                :show_group_name="item.show_group_name"
                                :right="item.right"
                                :url="item.url"
                                :base_url="item.base_url"
                                @input="emitFormAttachHandler(item['event.input'],$event)"
                                @selected="emitFormAttachHandler(item['event.selected'],$event)"
                                :class="item.class"
                                v-validate="fetchValidationRules(item)"
                                :data-vv-as="item.label"
                                :state="errors.has(item.name) ? false : null"
                              ></ac-grouped-dropdown>

                            <!-- Form Help dropdown for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>
                          <template v-else-if="item.type == 'ac-dropdown'">
                            <ac-dropdown
                              :name="item.name"
                              :id="item.id"
                              :split="convert_string_to_object(item.split) ? JSON.parse(item.split):item.split"
                              :size="item.size"
                              :split_variant="item.split_variant"
                              :variant="item.variant"
                              :split_href="item.split_href"
                              :split_button_type="item.split_button_type"
                              :dropdown_header="item.dropdown_header"
                              :dropdown_header_class="item.dropdown_header_class"
                              :no_caret="convert_string_to_object(item.no_caret) ? JSON.parse(item.no_caret):item.no_caret"
                              :lazy="convert_string_to_object(item.lazy) ? JSON.parse(item.lazy):item.lazy"
                              :items="convert_string_to_object(item.items) ? JSON.parse(item.items):item.items"
                              :url="item.url"
                              :base_url="item.base_url"
                              @d_item_clicked="emitFormAttachHandler(item['event.d_item_clicked'],$event)"
                              :class="item.class"
                            ></ac-dropdown>

                            <!-- Form Help dropdown for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Multiselect Component -->
                          <template v-else-if="item.type == 'multiselect'">
                            <appup-multiselect
                              :name="item.name"
                              :id="item.id"
                              :options="convert_string_to_object(item.option) ? JSON.parse(item.option):item.option"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :taggable="item.taggable"
                              @input="emitFormAttachHandler(item['event.input'],$event)"
                              @add_tag="emitFormAttachHandler(item['event.add_tag'],$event)"
                              :state="errors.has(item.name) ? false : null"
                              :url="item.url ? item.url : null"
                              :key_value="item.key_value ? item.key_value : null"
                              :key_label="item.key_label ? item.key_label : null"
                              :class="item.fieldClass"
                              v-bind="convert_string_to_object(item.config) ? JSON.parse(item.config):item.config"
                            />

                            <!-- Form Help multiselect for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <template v-else-if="item.type == 'typeahead'">
                            <appup-typeahead
                              :name="item.name"
                              :id="item.id"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              @input="manualInputTrigger"
                              :state="errors.has(item.name) ? false : null"
                              :url="item.url ? item.url : null"
                              :key_value="item.key_value ? item.key_value : null"
                              :key_label="item.key_label ? item.key_label : null"
                              :class="item.fieldClass"
                              :custom_query="item.custom_query ? item.custom_query : null"
                              :response-key="item.response_key ? item.response_key : null"
                              v-bind="convert_string_to_object(item.config) ? JSON.parse(item.config):item.config"
                              @remove="attachHandler(item['event.remove'],$event)"
                              @select="attachHandler(item['event.select'],$event)"
                            />

                            <!-- Form Help multiselect for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Tags Component -->
                          <template v-else-if="item.type == 'tags'">
                            <appup-tags
                              :name="item.name"
                              :id="item.id"
                              :options="convert_string_to_object(item.option) ? JSON.parse(item.option):item.option"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              @input="manualInputTrigger"
                              :state="errors.has(item.name) ? false : null"
                              :url="item.url ? item.url : null"
                              :key_value="item.key_value ? item.key_value : null"
                              :key_label="item.key_label ? item.key_label : null"
                              :class="item.fieldClass"
                              v-bind="convert_string_to_object(item.config) ? JSON.parse(item.config):item.config"
                            />

                            <!-- Form Help tags for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- File Component -->
                          <template v-else-if="item.type == 'file'">
                            <appup-file
                              :name="item.name"
                              :id="item.id"
                              v-model="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                              :placeholder="item.placeholder"
                              :supportedFormats="item.supportedFormats ? item.supportedFormats : null"
                              :class="item.fieldClass"
                              @input="attachHandler(item['event.input'],$event)"
                              @change.native="attachHandler(item['event.change'],$event)"
                            />

                            <!-- Form Help file for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Section Component -->
                          <template v-else-if="item.type == 'section'">
                            <appup-section
                              ref="appupSection"
                              @drag-drop="attachHandler(item['event.drag_drop'],$event)"
                              @input="manualInputTrigger"
                              @change="attachHandler(item['event.change'],$event)"
                              :default_key="item.default_key"
                              :radio="item.radio"
                              :radio_alignment="item.radio_alignment"
                              :radio_tooltip="item.radio_tooltip"
                              :button_options="typeof item.button_options == 'string'? JSON.parse(item.button_options) : item.button_options"
                              :rule_json="typeof item.rule_json == 'string'? JSON.parse(item.rule_json) : item.rule_json"
                              :prefill_data="typeof form[item.name] == 'string'? JSON.parse(form[item.name] ? form[item.name] : form[item.name]= []) : (form[item.name] ? form[item.name] : form[item.name]= [])"
                              v-model="form[item.name]"
                              :id="item.id"
                              :class="item.class"
                              :show_add_label="item.show_add_label"
                              :show_close_label="item.show_close_label"
                            ></appup-section>

                            <!-- Form Help file for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <template v-else-if="item.type == 'template-render'">
                            <ac-html :html="item.html" :url="item.url" />
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Code Editor -->
                          <template v-else-if="item.type == 'code-editor'">
                            <editor
                              v-model="form[item.name]"
                              @init="editorInit"
                              :lang="item.lang"
                              theme="chrome"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :name="item.name"
                              :width="item.width"
                              :height="item.height"
                              :class="item.fieldClass"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <!-- Form Help code-editor for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Workflow Designer -->
                          <template v-else-if="item.type == 'workflow'">
                            <appup-workflow
                              :name="item.name"
                              ref="workflow"
                              :src="item.src"
                              :width="item.width"
                              :height="item.height"
                              :render="item.render"
                              :toolbar1="item.toolbar1"
                              :toolbar2="item.toolbar2"
                              :marketplace="item.marketplace"
                              v-model="form[item.name]"
                              :class="item.fieldClass"
                            />

                            <!-- Form Help workflow for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Plain HTML -->
                          <template v-else-if="item.type == 'html'">
                            <span v-html="item.html" :class="item.fieldClass"></span>

                            <!-- Form Help html for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>
                          <!-- Upload File component -->
                          <template v-else-if="item.type == 'upload'">
                            <appup-upload
                              :name="item.name"
                              :upload_type="item.upload_type"
                              :allow_origin="item.allow_origin"
                              :custom_file_name="eval_values(item.custom_file_name)"
                              :uploadConfig="convert_string_to_object(item.uploadConfig) ? JSON.parse(item.uploadConfig):item.uploadConfig"
                              v-model="form[item.name]"
                              :class="item.fieldClass"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Grid - Array of Objects -->
                          <!-- ref can be used to use grid api methods -->
                          <template v-else-if="item.type == 'grid'">
                            <appup-grid
                              :name="item.name"
                              ref="formgrid"
                              :columns="item.columns"
                              :form-json="item.formJson"
                              v-model="form[item.name]"
                              @input="$emit('input', form)"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Dual list -->
                          <template v-else-if="item.type == 'dual-list'">
                            <ac-dual-list
                              :name="item.name"
                              v-model="form[item.name]"
                              :collection_options="convert_string_to_object(item.collection) ? JSON.parse(item.collection):item.collection"
                              :dropdown_options="convert_string_to_object(item.dropdown) ? JSON.parse(item.dropdown):item.dropdown"
                              :options="convert_string_to_object(item.options) ? JSON.parse(item.options):item.options"
                              :key_value="item.key_value ? item.key_value : null"
                              :key_label="item.key_label ? item.key_label : null"
                              :search_placeholder="item.search_placeholder ? item.search_placeholder : 'Filter'"
                              @change="attachHandler(item['event.change'],$event)"
                              @dropdown_click="attachHandler(item['event.dropdown_click'],$event)"
                              @deleteAndInsert="attachHandler(item['event.deleteAndInsert'],$event)"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Swatches -->
                          <template v-else-if="item.type == 'swatches'">
                            <ac-swatches
                              :name="item.name"
                              v-model="form[item.name]"
                              :colors="convert_string_to_object(item.colors) ? JSON.parse(item.colors):item.colors"
                              @input="attachHandler(item['event.input'],$event)"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- copy the code -->
                          <template v-else-if="item.type == 'copy-code'">
                            <appup-copycode
                              :name="item.name"
                              :copy="item.copy"
                              :share="item.share"
                              :copy_data="item.copy_data"
                              :share_data="item.share_data"
                              v-model="form[item.name]"
                              @share="attachHandler(item['event.share'],$event)"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Data range picker -->
                          <template v-else-if="item.type == 'date-range'">
                            <ac-date-range-picker
                              :name="item.name"
                              :opens="item.opens"
                              :date_range="{'startDate':item.startDate,'endDate':item.endDate}"
                              :locale-data="convert_string_to_object(item.localeData) ? JSON.parse(item.localeData):item.localeData"
                              @date-range-selected="attachHandler(item['event.date-range-selected'],$event)"
                              :minDate="item.minDate"
                              :maxDate="item.maxDate"
                              :singleDatePicker="item.singleDatePicker"
                              :showWeekNumbers="item.showWeekNumbers"
                              :showDropdowns="item.showDropdowns"
                              :autoApply="item.autoApply"
                              v-model="form[item.name]"
                              :ranges="item.showRanges ? ( item.ranges ? convert_string_to_object(item.ranges) ? JSON.parse(item.ranges):item.ranges : undefined ) : false"
                              @input="emitFormAttachHandler(item['event.input'],$event)"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>
                          <!-- Form type - Inner form component which takes form json or REST URL with form json response and constructs a form  -->
                          <template v-else-if="item.type == 'form2'">
                            <appup-form2
                              :name="item.name"
                              :fields-url="item.fieldsUrl"
                              :form-json="item.formJson"
                              :form-data="form[item.name]"
                              v-model="form[item.name]"
                              ref="form"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <template v-else-if="item.type == 'canvas'">
                            <ac-canvas
                              :name="item.name"
                              :canvas_id="item.canvas_id"
                              :canvas_config="convert_string_to_object(item.canvas_config) ? JSON.parse(item.canvas_config):item.canvas_config"
                              v-model="form[item.name]"
                              @input="emitFormAttachHandler(item['event.input'],$event)"
                            ></ac-canvas>
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <!-- Form type - Inner form component which takes form json or REST URL with form json response and constructs a form  -->
                          <template v-else-if="item.type == 'form'">
                            <appup-form
                              :name="item.name"
                              :fields-url="item.fieldsUrl"
                              :form-json="item.formJson"
                              :form-data="form[item.name]"
                              v-model="form[item.name]"
                              ref="form"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />

                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <template v-else-if="item.type == 'email-builder'">
                            <ac-email-builder
                              :name="item.name"
                              :render="item.render"
                              v-model="form[item.name]"
                              :data="form[item.name]"
                              v-validate="fetchValidationRules(item)"
                              @input="emitFormAttachHandler(item['event.input'],$event)"
                            />
                          </template>
                          
                          <template v-else-if="item.type == 'ui-builder'">
                            <appup-builder
                              :name="item.name"
                              ref="builder"
                              :src="item.src"
                              :width="item.width"
                              :height="item.height"
                              v-model="form[item.name]"
                              :class="item.fieldClass"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                            />
                          </template>
                          <template v-else-if="item.type == 'form-builder'">
                            <ac-helper-form
                              :name="item.name"
                              v-model="form[item.name]"
                              @saveRecord="$emit('input', form)"
                              @deleteItem="$emit('input', form)"
                              :class="item.class"
                            ></ac-helper-form>
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>

                          <template v-else-if="item.type == 'designer'">
                            <appup-designer
                              :name="item.name"
                              ref="designer"
                              :src="item.src"
                              :width="item.width"
                              :height="item.height"
                              v-model="form[item.name]"
                              :class="item.class"
                              v-validate="fetchValidationRules(item)"
                              :data-vv-as="item.label"
                              :state="errors.has(item.name) ? false : null"
                              @saveRecord="$emit('input', form)"
                              @deleteItem="$emit('input', form)"
                            />
                          </template>

                          <!-- For all other fileds like text,email,number,url,tel,search,range,password,color,etc., -->
                          <template v-else>
                            <b-input-group :prepend="item.prepend" :append="item.append">
                              <b-form-input
                                :disabled="item.disabled && !(item.disabled && item.disabled == 'false')|| item.disabled == 'true'"
                                class="appup-input"
                                :id="'input_'+item.id"
                                :name="item.name"
                                :type="item.type"
                                :placeholder="item.placeholder"
                                v-model="form[item.name]"
                                v-validate="fetchValidationRules(item)"
                                :data-vv-as="item.label"
                                :state="errors.has(item.name) ? false : null"
                                :class="item.fieldClass"
                                @input="attachHandler(item['event.input'],$event)"
                                @change.native="attachHandler(item['event.change'],$event)"
                                @focus.native="attachHandler(item['event.focus'],$event)"
                                @blur.native="attachHandler(item['event.blur'],$event)"
                                @keydown.enter="preventMethod($event)"
                                @keydown.native="attachHandler(item['event.keydown'],$event)"
                                @keyup.native="attachHandler(item['event.keyup'],$event)"
                              ></b-form-input>

                              <!-- Toogle password field if showPassword is true -->
                              <b-input-group-text slot="append" v-if="item.showPassword">
                                <a
                                  @click="item.type === 'password' ? item.type = 'text' : item.type = 'password'"
                                >
                                  <i class="fas fa-eye-slash" v-if="item.type === 'password'"></i>
                                  <i class="fas fa-eye" v-else></i>
                                </a>
                              </b-input-group-text>
                            </b-input-group>

                            <!-- Form Help text for description -->
                            <b-form-text v-if="item.description">{{item.description}}</b-form-text>
                          </template>
                          <!-- Placeholder for form fields validation messages -->
                          <span
                            v-show="errors.has(item.name)"
                            class="invalid-feedback"
                            style="display: block"
                          >{{ errors.first(item.name) }}</span>
                        </b-form-group>
                      </div>
                      <slot v-if="item.name" :name="item.name + '-after' "></slot>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div
        v-if="buttons && buttons.length"
        class="mb-2 form-save"
        :class="[button_group_class, {'d-none': position!='bottom',
                                    'text-center': direction=='center',
                                    'text-left': direction=='left',
                                    'text-right': direction=='right'}]"
      >
        <b-button
          class="submit-button"
          v-for="(btn, index) in buttons"
          :id="btn.id"
          :disabled="btn.disabled"
          :key="`btn-bottom-${index}`"
          :type="(btn.type === 'submit') ? 'submit' : 'button'"
          :variant="btn.variant"
          :workflow="btn.workflow"
          :class="btn.class"
          @click="attach_handler_on_button_click($event, btn)"
        >{{btn.label}}</b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
import { AjaxRequests } from "../../mixins/ajaxRequests";
import { Workflow } from "../../mixins/workflow";
import { AppupEvents } from "../../mixins/events";
import appupBuilder from "../../components/ui-builder/builder.vue";
import appupDesigner from "../../components/ui-builder/designer.vue";
let lodash = require("lodash");

import Dropdown from "../../components/inputs/dropdown";
import Vue from "vue";
import axios from "axios";

export default {
  name: "appup-form2",
  mixins: [AjaxRequests, Workflow, AppupEvents],
  components: {
    editor: require("chapalamadugu-vue2-ace-editor"),
    appupBuilder,
    appupDesigner
  },
  props: {
    /**
     * form tittle
     */
    formTittle: {
      type: String,
      required: false
    },
    /**
     * Load form from form-json object data
     * if this is set preload handler will not call
     */
    formJson: {
      type: Object,
      default: null
    },
    value: {
      type: Object,
      required: false
    },
    addElement: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Position of group buttons.
     *
     * `top`, `bottom`
     */
    position: {
      type: String,
      required: false,
      default: "bottom"
    },
    /**
     * Position of group buttons.
     *
     * `center`, `left`, `right`
     */
    direction: {
      type: String,
      required: false,
      default: "right"
    },

    /**
     * URL to deserialize the form initially.
     */
    preload: {
      type: String,
      required: false
    },

    /**
     * Submit Workflow ID
     */
    submit: {
      type: String,
      required: false
    },
    /**
     * Get form fields json from fieldsUrl
     */
    fieldsUrl: {
      type: String,
      default: ""
    },
    /**
     * Prepopulate form with this data
     */
    formData: {
      type: Object,
      default: null
    },
    convert_schema: {
      type: Boolean,
      default: true
    },
    sections: {
      type: String,
      default: null
    },
    section_classes: {
      type: String,
      default: null
    },
    form_group_class: {
      type: String
    },
    button_group_class: {
      type: String
    }
  },
  data() {
    return {
      formFields: [],
      buttons: [],
      form: {},
      tabsData: {},
      tabActive: {},
      sectionCSSClass: {},
      subSectionClasses: {}
    };
  },
  created() {
    if (this.preload) {
      try {
        // For multiple handlers
        this.start(JSON.parse(this.preload));
      } catch (error) {
        this.start(this.preload);
      }
    } else {
      if (this.fieldsUrl) {
        this.getFormJsonFromUrl();
      } else {
        this.setFormFields();
      }
    }

    // Prepopulate form
    if (this.formData) {
      this.form = JSON.parse(JSON.stringify(this.formData));
    }
    try {
      this.sectionCSSClass = JSON.parse(this.sections);
    } catch (error) {
      if (typeof this.sections === "object")
        this.sectionCSSClass = this.sections;
      else this.sectionCSSClass = null;
    }

    try {
      this.subSectionClasses = JSON.parse(this.section_classes);
    } catch (error) {
      this.subSectionClasses =
        typeof this.section_classes === "object" ? this.section_classes : null;
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.form = newVal;
    },
    form: {
      handler(val) {
        // Computational
        this.computeFields();
      },
      deep: true
    },
    formFields: {
      handler(newValue, oldValue) {
        //calculate default values of fields
        this.defaultValues();
        //computation of fields
        this.computeFields();
        //Tabs Generate
        this.generate_tabs();
      },
      deep: true
    },
    // formFields(newVal, oldVal) {
    //   //calculate default values of fields
    //   this.defaultValues();
    //   //computation of fields
    //   this.computeFields();
    //   //Tabs Generate
    //   this.generate_tabs();
    // },
    formJson: {
      handler(val) {
        this.formFields = this.convert_json(val.fields);
        this.buttons = val.buttons;

        // if form is null, set empty object. This solves null error in v-model
        if (!this.form) {
          this.form = {};
        }
      },
      deep: true
    },
    formData: {
      handler(val) {
        this.form = JSON.parse(JSON.stringify(val));
      },
      deep: true
    },
    sections(val) {
      this.sectionCSSClass = JSON.parse(val);
    }
  },
  methods: {
    preventMethod: function(event){
      event.preventDefault();
    },
    eval_values(value) {
      let form = this.form;
      return eval(value);
    },
    attach_handler_on_button_click(evt, button) {
      let type = button.type;
      evt.preventDefault();
      if (type === "submit") {
        this.onSubmit(evt);
      } else {
        let convert_handler_params = null;
        try {
          convert_handler_params = JSON.parse(button.handlerParams);
        } catch (error) {
          convert_handler_params = button.handlerParams;
        }
        if (button.handlerName) {
          this.start(button.handlerName, {
            handlerParams: convert_handler_params ? convert_handler_params : {}
          });
        }
      }
    },
    convert_string_to_object(value) {
      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    /**
     * @param oldJsonFields - formJson schema of appup-form component
     * converting appup-form formJson to appup-form2 schema(added functionalities like section support)
     */
    convert_json(oldJsonFields) {
      //convert_schema has to true when formJson schema same as appup-form formJson.by default it is true
      if (this.convert_schema) {
        let newJsonFields = [];
        //grouping with same section
        let sectionGroup = _.groupBy(oldJsonFields, "sectionGroup");
        for (var key in sectionGroup) {
          let section = [];
          //grouping with sectionName in each section - to form subsections
          sectionGroup[key] = _.groupBy(sectionGroup[key], "sectionName");
          for (var subSec in sectionGroup[key]) {
            var subSection = [];
            //In each subsection - grouping with rowIndex to show fields in order based on rowIndex, fields with same rowIndex will show as cols in a row
            sectionGroup[key][subSec] = _.groupBy(
              sectionGroup[key][subSec],
              "rowIndex"
            );
            for (var rowIndex in sectionGroup[key][subSec]) {
              //if rowIndex is not given then it grouped as undefined.
              if (rowIndex == "undefined") {
                //showing each field as a row.
                for (
                  var i = 0;
                  i < sectionGroup[key][subSec][rowIndex].length;
                  i++
                ) {
                  let rowField = [];
                  rowField[0] = sectionGroup[key][subSec][rowIndex][i];
                  subSection.push(rowField);
                }
              } else {
                let row = sectionGroup[key][subSec][rowIndex];
                subSection.push(row);
              }
            }
            section.push(subSection);
          }
          newJsonFields.push(section);
        }
        return newJsonFields;
      } else {
        return oldJsonFields;
      }
    },
    getSectionClasses(subSection) {
      let field = subSection[0][0] ? subSection[0][0] : null;
      if (
        field &&
        this.subSectionClasses &&
        this.subSectionClasses.hasOwnProperty(field.sectionGroup) &&
        this.subSectionClasses[field.sectionGroup].hasOwnProperty(
          field.sectionName
        )
      ) {
        return this.subSectionClasses[field.sectionGroup][field.sectionName];
      } else {
        return;
      }
    },
    no_of_columns(length, subSectionIndex, subSection) {
      var len = parseInt(12 / length);
      let field = subSection[0];
      if (
        this.sectionCSSClass &&
        this.sectionCSSClass.hasOwnProperty(field.sectionGroup) &&
        this.sectionCSSClass[field.sectionGroup].hasOwnProperty(
          field.sectionName
        )
      ) {
        return this.sectionCSSClass[field.sectionGroup][field.sectionName];
      } else if (subSectionIndex == length - 1)
        return "col-md-" + len + " pl-4";
      else return "col-md-" + len + " border-right pr-4";
    },
    generate_tabs() {
      /**
       *loop through all fields and get each field container, container-name and container-active.
       * Push to tabs array with section index, sub section index and field index.
       * index's maintaining for to show tabs at the index which is having first container prop.
       */

      let tabs = [];
      this.formFields.forEach((section, secIndex) => {
        section.forEach((subSection, subSecIndex) => {
          subSection.forEach((group, index) => {
            //getting tab detailes from first object of section
            var firstJson = group[0];
            if (firstJson["container"]) {
              let tabObj = {
                tabGroup: firstJson["container"],
                tabName: firstJson["container-name"],
                tabActive: firstJson["container-active"],
                index: index,
                secIndex: secIndex,
                subSecIndex: subSecIndex
              };
              tabs.push(tabObj);
            }
          });
        });
      });

      //if tabs present
      if (tabs && tabs.length) {
        var groupWithSecIndex = _.groupBy(tabs, "secIndex");
        var groupWithSubSecIndex = JSON.parse(
          JSON.stringify(groupWithSecIndex)
        );
        for (var key in groupWithSecIndex) {
          groupWithSubSecIndex[key] = _.groupBy(
            groupWithSecIndex[key],
            "subSecIndex"
          );
        }

        for (var secIndex in groupWithSubSecIndex) {
          for (var subSecIndex in groupWithSubSecIndex[secIndex]) {
            groupWithSubSecIndex[secIndex][subSecIndex] = _.groupBy(
              _.sortBy(groupWithSubSecIndex[secIndex][subSecIndex], "index"),
              "tabGroup"
            );
          }
        }
        let tabsData = {};
        for (var secIndex in groupWithSubSecIndex) {
          this.tabActive[secIndex] = {};
          tabsData[secIndex] = {};
          for (var subSecIndex in groupWithSubSecIndex[secIndex]) {
            this.tabActive[secIndex][subSecIndex] = {};
            tabsData[secIndex][subSecIndex] = {};
            var tabGroups = groupWithSubSecIndex[secIndex][subSecIndex];
            for (var tabGroup in tabGroups) {
              let firstTabInd = tabGroups[tabGroup][0].index;
              let tabTitles = [];
              let tabActive = null;
              tabGroups[tabGroup].forEach(field => {
                tabTitles.push(field.tabName);
                //last tabname in a tabGroup is active, it will become current active tab
                if (field.tabActive == true) tabActive = field.tabName;
              });
              //to avoid duplicate tabnames
              tabTitles = Array.from(new Set(tabTitles));
              tabsData[secIndex][subSecIndex][firstTabInd] = {
                tabGroup,
                tabTitles,
                tabActive
              };
              //Maintaing all tabGroup with respective tabName which is active, to use in tabClicked method
              this.tabActive[secIndex][subSecIndex][tabGroup] = tabActive;
            }
          }
        }
        this.tabsData = tabsData;
        console.log("tabsData", this.tabsData);
        return true;
      } else return false;
    },
    setFormFields() {
      if (this.formJson && this.formJson.fields) {
        this.formFields = this.convert_json(this.formJson.fields);
      }
      if (this.formJson && this.formJson.buttons) {
        this.buttons = this.formJson.buttons;
      }
    },
    defaultValues() {
      debugger;
      this.formFields.forEach(section => {
        section.forEach(subSection => {
          subSection.forEach(group => {
            group.forEach(field => {
              if (this.formData) {
                if (!this.formData.hasOwnProperty(field.name)) {
                  this.fieldCheck(this.form, field);
                }
              } else {
                this.fieldCheck(this.form, field);
              }
            });
          });
        });
      });

      this.$emit("input", this.form);
    },
    fieldCheck(form, field) {
      if(this.form[field.name]){
        field.value = this.form[field.name]
      }
      this.$set(form, field.name, field.value ? field.value : "");
    },
    computeFields() {
      this.formFields.forEach(section => {
        section.forEach(subSection => {
          subSection.forEach(group => {
            group.forEach(field => {
              if (field.computation) {
                let form = this.form;
                const val = eval(field.computation);
                //console.log("Computing " +field.name +" " +val +" " + field.computation);
                field.value = val;
                this.form[field.name] = val;
              }
            });
          });
        });
      });
    },
    onFormInput(e) {
      console.log("Form input ...");
      if (e.target.type !== "checkbox" && e.target.type !== "radio") {
        this.$emit("input", this.form);
      }
    },
    fetchValidationRules(field) {
      let rule = {};

      if (field.validation) {
        try {
          rule = JSON.parse(field.validation);
        } catch {
          rule = field.validation;
        }
      }

      // Set Required
      if (field.required) {
        rule.required = field.required;
      }

      // Validation rules based upon field type
      if (
        field.type == "text" ||
        field.type == "password" ||
        field.type == "textarea" ||
        field.type == "editor"
      ) {
        if (field.minLength) {
          rule.min = field.minLength;
        }
        if (field.maxLength) {
          rule.max = field.maxLength;
        }
      } else if (field.type == "email") {
        rule.email = true;
      } else if (field.type == "number") {
        rule.numeric = true;
        if (field.min) {
          rule.min_value = field.min;
        }
        if (field.max) {
          rule.max_value = field.max;
        }
      } else if (field.type == "code-editor") {
        if (field.lang == "json") rule.json = true;
      }
      return rule;
    },
    attachHandler(handlers, event) {
      if (typeof handlers == "object") {
        let handlersList = [];
        for (let i = 0; i < handlers.length; i++) {
          handlersList[i] = {};
          handlersList[i].name = handlers[i].name;

          let handlersParams = {};
          try {
            if (typeof handlers[i].params == "object") {
              handlersParams = handlers[i].params;
            } else {
              handlersParams = JSON.parse(handlers[i].params);
            }
          } catch (error) {
            handlersParams = {};
          }
          handlersList[i].params = {
            event: event,
            handlerParams: handlersParams
          };
        }
        if (handlersList.length > 0) {
          this.start(handlersList);
        }
      } else if (typeof handlers == "string") {
        this.start(handlers);
      }
    },
    dynamicAddInput(value, id, type) {
      // To reflect change in radio button
      if (type === "radio") {
        this.$emit("input", this.form);
      }
      this.$emit("dynamicAddInput", value, id, type);
    },
    manualInputTrigger() {
      this.$emit("input", this.form);
    },
    listenDropdownChange(index, event, item) {
      this.$set(this.form, this.formFields[index].name, event.value);
      this.attachHandler(item["event.change"], event);
    },
    editorInit: function() {
      /* Init editor with the options we need */

      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/scss");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },
    emitFormAttachHandler(handlers, event) {
      console.log("in emitFormAttachHandler");

      //emit form
      this.manualInputTrigger();

      //call handler
      this.attachHandler(handlers, event);
    },
    condition(item) {
      if (!item.condition) return true;

      // Users may not call this.form - they will just call form
      let form = this.form;
      return eval(item.condition);
    },
    showInTab(sectionIndex, subSectionIndex, group) {
      if (!group[0]["container"]) return true;
      if (
        this.tabActive.hasOwnProperty(sectionIndex) &&
        this.tabActive[sectionIndex].hasOwnProperty(subSectionIndex) &&
        this.tabActive[sectionIndex][subSectionIndex][group[0]["container"]] ==
          group[0]["container-name"]
      ) {
        return true;
      }
    },
    tabClicked(sectionIndex, subSectionIndex, tabGroup, tabTitle) {
      let obj = this.tabActive;
      obj[sectionIndex][subSectionIndex][tabGroup] = tabTitle;
      this.tabActive = Object.assign({}, obj);
    },
    designer_save(callback) {
      // Check if designer exists
      let field;
      this.formFields.forEach(section => {
        section.forEach(subSection => {
          subSection.forEach(group => {
            field = group.find(x => x.type === "workflow");
            //to exit loop
            if (field) return false;
          });
          if (field) return false;
        });
        if (field) return false;
      });

      // Execute callback if there is no designer
      if (!field) {
        callback();
        return;
      }

      // Call Designer Save - this is asynchronous
      this.$refs.workflow[0].save().then(() => {
        console.log("Saved ");
        this.form[field.name] = this.$refs.workflow[0].get_json();
        console.log("Designer form saved " + this.form[field.name]);

        // Call the next node from validate
        callback();
      });
    },
    builder_save(callback) {
      // Check if ui builder exists
      let field;
      this.formFields.forEach(section => {
        section.forEach(subSection => {
          subSection.forEach(group => {
            field = group.find(x => x.type === "ui-builder");
            //to exit loop
            if (field) return false;
          });
          if (field) return false;
        });
        if (field) return false;
      });

      // Execute callback if there is no builder
      if (!field) {
        callback();
        return;
      }

      // Call builder Save - this is asynchronous
      if (
        typeof this.$refs.builder !== "undefined" &&
        this.$refs.builder.length !== 0
      ) {
        this.$refs.builder[0].save().then(() => {
          console.log("Builder saved");
          this.form[field.name] = this.$refs.builder[0].getJson();
          console.log("Builder form saved " + this.form[field.name]);

          // Call the next node from validate
          callback();
        });
      } else {
        callback();
      }
    },
    bm_save(callback) {
      // Check if ui builder exists
      // let field = this.formFields.find(x => x.type === "designer");
      let field;
      this.formFields.forEach(section => {
        section.forEach(subSection => {
          subSection.forEach(group => {
            field = group.find(x => x.type === "designer");
            //to exit loop
            if (field) return false;
          });
          if (field) return false;
        });
        if (field) return false;
      });

      // Execute callback if there is no builder
      if (!field) {
        callback();
        return;
      }

      // Call BM-builder Save - this is asynchronous
      if (
        typeof this.$refs.designer !== "undefined" &&
        this.$refs.designer.length !== 0
      ) {
        this.$refs.designer[0].save().then(() => {
          console.log("Builder saved");
          this.form[field.name] = this.$refs.designer[0].get_json();
          console.log("Builder form saved " + this.form[field.name]);

          // Call the next node from validate
          callback();
        });
      } else {
        callback();
      }
    },
    onSubmit(evt) {
      evt.preventDefault();

      // Call the workflow
      if (this.submit) {
        console.log("Calling workflow");
        try {
          this.start(JSON.parse(this.submit));
        } catch (error) {
          this.start(this.submit);
        }
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.errors.clear();
    },
    getFormJsonFromUrl() {
      // axios
      //   .get(this.fieldsUrl, { withCredentials: true, credentials: "include" })
      //   .then(response => {
      // this.$appupajax
      //   .get2(
      //     this.fieldsUrl,
      //     {},
      //     { withCredentials: true, credentials: "include" }
      //   )
      this.$appupajax
        .get2(
          this.fieldsUrl,
          {},
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(this.$appupajax.handleResponse)
        .then(response => {
          let result = JSON.parse(JSON.stringify(response));
          if (this.formJson) {
            if (this.formJson.fields && result.data.fields) {
              this.formJson.fields = this.formJson.fields.concat(
                result.data.fields
              );
            } else if (!this.formJson.fields && result.data.fields) {
              this.formJson["fields"] = result.data.fields;
            }

            if (this.formJson.buttons && result.data.buttons) {
              this.formJson.buttons = this.formJson.buttons.concat(
                result.data.buttons
              );
            } else if (!this.formJson.buttons && result.data.buttons) {
              this.formJson["buttons"] = result.data.buttons;
            }
            delete result.data.fields;
            delete result.data.buttons;
            this.formJson = { ...this.formJson, ...result.data };
            // console.log("final formJson", this.formJson)
          } else {
            this.formJson = result.data;
          }
          this.setFormFields();
        });
    }
  }
};
</script>