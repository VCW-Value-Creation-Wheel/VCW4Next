<#macro kw component="a" rest...>
  <${component}
    class="inline-flex text-primary hover:text-primary"
    <#list rest as attrName, attrValue>
      ${attrName}="${attrValue}"
    </#list>
  >
    <#nested>
  </${component}>
</#macro>
