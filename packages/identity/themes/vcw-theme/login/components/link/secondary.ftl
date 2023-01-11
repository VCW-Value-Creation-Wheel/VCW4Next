<#macro kw component="a" rest...>
  <${component}
    class="inline-flex text-secondary hover:text-secondary"
    <#list rest as attrName, attrValue>
      ${attrName}="${attrValue}"
    </#list>
  >
    <#nested>
  </${component}>
</#macro>
