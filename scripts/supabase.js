const supabaseUrl = 'https://jhhwvtuhoubrbwkxbjeh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoaHd2dHVob3VicmJ3a3hiamVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MTUsImV4cCI6MjA2NzAyMDgxNX0.j_nK6vIbnV9RTMfcwsI5IAd36Amb31b0l_6XrZb6z88'

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

async function loadProducts(sugarFreeFilter = null) {
	let query = supabaseClient.from('items').select('*')
	if (sugarFreeFilter === true) {
		query = query.eq('sugar_free', true)
	}
	
  const { data: items, error } = await query

  if (error) {
    console.error('Ошибка при загрузке товаров:', error)
    return
  }

  const container = document.querySelector('.products-items')
  container.innerHTML = ''

  items.forEach(item => {
    const productDiv = document.createElement('div')
    productDiv.classList.add('products-item')
    if (item.sugar_free) productDiv.classList.add('sugar-free')

    productDiv.innerHTML = `
      <div class="products-item-image">
        <img src="${item.image_url}" alt="Product">
      </div>
      <div class="products-item-details">
        <div class="products-item-title">${item.title}</div>
        <div class="products-item-text">${item.description}</div>
        <div class="products-item-extra">
          <div class="products-item-info">
            <div class="products-item-price" data-base-price="${item.price}">${item.price} $</div>
            <div class="products-item-weight">${item.weight}</div>
          </div>
          <button class="button" onclick="selectProduct('${item.title}', ${item.price})">Заказать</button>
        </div>
      </div>
    `

    container.appendChild(productDiv)
  })
}

window.loadProducts = loadProducts
