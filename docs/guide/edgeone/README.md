# Edgeone 优选指南

::: tip
仅适用于CDN服务，不适用于pages服务。<br/>
此优选方法仅适用于部分旧添加的域名。新添加的域名腾讯云增加了限制，如果使用后出现418错误，则代表您的域名不适用于此优选。
:::

只需将官方分配的`你的域名.eo.dnse[1-5].com`更改为`*.edgeone.byoip.top`或`netlify.468123.xyz`,

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `*` | 可替换为任意字符串 | `myapp.edgeone.byoip.top`<br>`web.netlify.468123.xyz`<br>`www.example.com.netlify.468123.xyz` |