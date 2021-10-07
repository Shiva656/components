### Differnt button sizes

```jsx
<div>
        <div class="row">
            <template v-for="buttonStyle in ['primary','secondary','success','outline-success','warning','danger','link']">
                <div class="col-md-4 pb-2" v-for="size in ['small','medium','large']" :key="`${buttonStyle}_${size}`">
                    <appup-button :size="size" :buttonStyle="buttonStyle" :label="`${buttonStyle}_${size}`"/>
                </div>
            </template>
        </div>
        <br/><br/>
        <div class="row">
            <div class="col-md-4 pb-2">
                <appup-button size="small" buttonStyle="success" label="Button with tooltip" tooltip="Sample tootltip"/>
            </div>
            <div class="col-md-4 pb-2">
                <appup-button size="small" buttonStyle="secondary" label="Submit Button" type="submit"/>
            </div>
            <div class="col-md-4 pb-2">
                <appup-button size="small" buttonStyle="success" label="Disabled Button" disabled="true"/>
            </div>
            <div class="col-md-4 pb-2">
                <appup-button size="small" buttonStyle="primary" label="Add Button with Icon" icon="plus"/>
            </div>
            <div class="col-md-4 pb-2">
                <appup-button size="small" buttonStyle="warning" tooltip="Button Icon" icon="beer"/>
            </div>
        </div>
    </div>
```