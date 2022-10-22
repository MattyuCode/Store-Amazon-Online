## Agregar TOASTR

```bash
npm i toastr
```

Luego copias el CDN 
# HTML
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.css">
```

# javascript

```javascript
 <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>
```

Por ultimo se copia y se pega en js

```javascript
    toastr.success('Have fun storming the castle!', 'Miracle Max Says')
```



3


¿Existe la posibilidad de que ejecutes en tu Javascript la siguiente orden?

document.getElementById('enlace').setAttribute('href', baseUrl+'/id/'+id);
Donde tu enlace sería el siguiente:

<a rel="nofollow" id="enlace" href="#" class="automatic">Enlace</a>
Esto asignará el atributo href sin tener que hacer click en el enlace, para que se asigne el href.