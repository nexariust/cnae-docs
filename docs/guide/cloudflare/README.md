# Cloudflare 优选指南

::: tip
# 需要自备一张银行卡，可以使用虚拟卡，如YPT
:::

首先前往你要使用的域名的控制台开通自定义主机名并绑定银行卡

![自定义主机名](../../_notes/img/cloudflare/saas.png)

## CDN优选

回到DNS处

![DNS](../../_notes/img/cloudflare/dns.png)

![源站ip](../../_notes/img/cloudflare/cdn/ip.png)

### 源站域名

添加一个A记录，指向你的源站的IP，并开启小黄云

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `名称` | 可替换为任意字符串 | `origin-1`<br>`ip` |
| `IPv4 地址` | 可替换为你的源站ip | `1.1.1.1`<br>`2.2.2.2` |

### 优选ip域名

再添加一个cname记录，cname到优选域名

![优选ip](../../_notes/img/cloudflare/cdn/cname.png)

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `名称` | 可替换为任意字符串 | `saas`<br>`cdn` |
| `目标` | 可替换为优选域名 | `cloudflare.468123.xyz` |

回到自定义主机名

![自定义主机名](../../_notes/img/cloudflare/saas.png)

添加回退源，指向你添加的A记录的域名，点击添加回退源

![回退源](../../_notes/img/cloudflare/cdn/saas-1.png)

随后点击添加自定义主机名

#### 对于单域名，即回退源和要优选域名的根域名一致

![单域名](../../_notes/img/cloudflare/cdn/saas-d.png)

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `自定义主机名` | 你要被优选的域名 | `www.fishicp.dpdns.org` |
| `自定义源服务器` | 必须选择自定义源服务器选项，如果有其他源站，可填写其他源站的域名 | `origin.fishicp.dpdns.org` |

其他选项请使用默认值

#### 对于双域名，即回退源和要优选的域名根域名不一致

![单域名](../../_notes/img/cloudflare/cdn/saas-s.png)

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `自定义主机名` | 你要被优选的域名 | `www.cnae.top` |
| `自定义源服务器` | 自定义源服务器选项，如果有其他源站，可填写其他源站的域名 | `origin.fishicp.dpdns.org` |

其他选项请使用默认值

### 优选配置

点击添加自定义主机名(这里以双域名为例)

![域名](../../_notes/img/cloudflare/cdn/saas-host.png)

单域名主机名状态正常应会自动验证，如果没有自动验证添加txt记录即可

::: tip
如果dns为cloudflare，则需删除根域名，仅保留`_cf-custom-hostname.子域名`即可
:::

![主机名状态](../../_notes/img/cloudflare/cdn/saas-hostname.png)

`_cf-custom-hostname.你要优选的域名` txt记录 值为cloudflare提供的txt记录

添加完主机名验证后，继续添加证书验证，如果要证书自动续签，请查看[证书自动续签](#证书自动续签)部分

`_acme-challenge.你要优选的域名` txt记录 值为cloudflare提供的txt记录

::: tip
如果dns为cloudflare，则需删除根域名，仅保留`_acme-challenge.子域名`即可
:::

![证书](../../_notes/img/cloudflare/cdn/saas-ssl.png)

最后添加cname记录指向[优选ip域名](#优选ip域名)中的域名即可

![优选ip](../../_notes/img/cloudflare/cdn/saas-cname.png)

过一会点击刷新按钮，应会显示如下状态

![主机名状态](../../_notes/img/cloudflare/cdn/saas-hostname-1.png)

## Pages优选

### 如果你的DNS提供商支持分线路

则默认解析设为`xxx.pages.dev`(你项目分配的默认cname域名)，将中国大陆地区设为`cloudflare.468123.xyz`

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `*` | 可替换为任意字符串 | `cloudflare.byoip.top` |

### 如果你的DNS提供商不支持分线路

::: tip
不确定证书是否会自动续签
:::

则将默认分配的`xxx.pages.dev`(你项目分配的默认cname域名)换为`cloudflare.468123.xyz`

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `*` | 可替换为任意字符串 | `myapp.cloudflare.byoip.top` |

## tunnel优选

打开 [Cloudflare Zero Trust 控制台](https://one.dash.cloudflare.com)，点击你的设备，点击编辑，来到图片中的页面

![所有域名](../../_notes/img/cloudflare/tunnel/all-domain.png)

### 添加回退源

点击添加"添加已发布应用程序路由"，随便添加一个子域名(需要在自定义主机名域名下的子域名)

::: tip
下图添加的域名不用于公共访问，仅作为回源使用
:::

![回源](../../_notes/img/cloudflare/tunnel/origin-domain.png)

| 占位符 | 说明 |
| --- | --- |
| `类型` | 随便选一个，建议为`HTTP`或`HTTPS` |
| `URL` | 随便，建议为`127.0.0.1` |

点击"保存"

### 添加公开访问域名

::: tip
创建域名，等于让cloudflare知道应该从这回源<br/>
如果源站有证书可以选择https端口并使用https协议回源，反之则使用http端口和http协议
:::

#### 对于在cloudflare的域名

![在cloudflare的域名](../../_notes/img/cloudflare/tunnel/domain-cf.png)

点击"保存"<br/>
回到cloudflare控制台，点击添加的主域名，点击dns记录，删除之前添加的cname记录

![删除cname记录](../../_notes/img/cloudflare/tunnel/domain-cf-dns.png)

点击`删除`

#### 对于不在cloudflare的域名

![不在cloudflare的域名](../../_notes/img/cloudflare/tunnel/domain-no-cf.png)

此时直接回车，即可添加<br/>
点击"保存"

### 添加自定义主机名

![自定义主机名](../../_notes/img/cloudflare/tunnel/saas.png)

| 占位符 | 说明 |
| --- | --- |
| `自定义主机名` | 为[添加公开访问域名](#添加公开访问域名)部分添加的域名 |
| `自定义源服务器` | 为[添加回退源](#添加回退源)部分添加的域名 |

其他部分(单域名优选等)请按照[优选配置](#优选配置)部分进行配置

## 证书自动续签

拉到自定义主机名页面底部，cloudflare会为每个开通自定义主机名的域名提供一个DCV 委派

![DCV](../../_notes/img/cloudflare/cdn/saas-dcv.png)

将`_acme-challenge.你要优选的域名`从txt改为cname，并指向DCV 委派分配的域名

::: tip
如果`_acme-challenge.你要优选的域名`添加过txt记录，请删除，否则会影响cname记录的工作
:::

![DCV-cname](../../_notes/img/cloudflare/cdn/dcv-cname.png)

::: tip
www.cnae.top.dbd3f6833b9e93c8.dcv.cloudflare.com这个cname记录仅适用于我的域名<br/>
如果是你的域名应为`被优选域名.cloudflare分配的dcv记录`
:::