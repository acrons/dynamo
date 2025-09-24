import { useState } from "preact/hooks";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  image?: string;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Anotadores Corporativos PERSONALIZADOS",
    category: "Anotadores Corporativos",
    price: 60000,
    stock: 25,
    minStock: 10,
    description: "Con grabado y corte laser",
  },
  {
    id: "2",
    name: "Bolsa Ecologica (Totebag) PERSONALIZADO",
    category: "Bolsos Ecologicos",
    price: 35000,
    stock: 45,
    minStock: 15,
    description: "Con bordado computarizado",
  },
  {
    id: "3",
    name: "Chopera acero inox 700ML PERSONALIZADO",
    category: "Hoppies, Vasos y Termos",
    price: 175000,
    stock: 12,
    minStock: 5,
    description: "Con grabado laser",
  },
  {
    id: "4",
    name: "Hoppie acero inox 550ML PERSONALIZADO",
    category: "Hoppies, Vasos y Termos",
    price: 165000,
    stock: 18,
    minStock: 8,
    description: "Con grabado laser",
  },
  {
    id: "5",
    name: "Hoppie acero inox 650ML PERSONALIZADO",
    category: "Hoppies, Vasos y Termos",
    price: 175000,
    stock: 15,
    minStock: 6,
    description: "Con grabado laser",
  },
  {
    id: "6",
    name: "Hoppie acero inox 950ML PERSONALIZADO",
    category: "Hoppies, Vasos y Termos",
    price: 215000,
    stock: 8,
    minStock: 4,
    description: "Con grabado laser",
  },
  {
    id: "7",
    name: "Mesita para Notebook PERSONALIZADO",
    category: "Mesitas Para notebook",
    price: 330000,
    stock: 5,
    minStock: 2,
    description: "Con grabado laser",
  },
  {
    id: "8",
    name: "Placas para mascotas con grabado laser",
    category: "Merchandising",
    price: 35000,
    stock: 32,
    minStock: 12,
    description: "Acero Inox, Acero Inox con tachas, Duratex y Melamina",
  },
  {
    id: "9",
    name: "Porta Tereré PERSONALIZADO",
    category: "Kit Asadero",
    price: 125000,
    stock: 14,
    minStock: 6,
    description: "Con grabado laser",
  },
];

export function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    description: "",
  });

  const categories = [
    "Anotadores Corporativos",
    "Bolsos Ecologicos",
    "Hoppies, Vasos y Termos",
    "Kit Asadero",
    "Merchandising",
    "Mesitas Para notebook",
    "Uniformes Corporativos con logo incluido",
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PY").format(num);
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.stock
    ) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        category: newProduct.category,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock),
        minStock: parseInt(newProduct.minStock) || 5,
        description: newProduct.description,
      };

      setProducts([...products, product]);
      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        minStock: "",
        description: "",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);

  return (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Productos</div>
          <div className="kpi-value">{products.length}</div>
          <div className="kpi-subtitle">En inventario</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Stock Bajo</div>
          <div className="kpi-value">{lowStockProducts.length}</div>
          <div className="kpi-subtitle">Productos</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Valor Total</div>
          <div className="kpi-value">
            {formatNumber(
              products.reduce((sum, p) => sum + p.price * p.stock, 0)
            )}
          </div>
          <div className="kpi-subtitle">Guaraníes</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Categorías</div>
          <div className="kpi-value">{categories.length}</div>
          <div className="kpi-subtitle">Disponibles</div>
        </div>
      </div>

      {/* Header con controles */}
      <div className="inventory-hero">
        <div className="inventory-hero-content">
          <div className="inventory-hero-text">
            <h2 className="inventory-hero-title">Gestión de Inventario</h2>
            <p className="inventory-hero-subtitle">
              Controla el stock de productos DYNAMO y gestiona tu inventario
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`inventory-add-button ${showAddForm ? "active" : ""}`}
          >
            <div className="add-button-icon">{showAddForm ? "✕" : "➕"}</div>
            <div className="add-button-text">
              <span className="add-button-title">
                {showAddForm ? "Cancelar" : "Agregar Producto"}
              </span>
              <span className="add-button-subtitle">
                {showAddForm ? "Cerrar formulario" : "Nuevo producto"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Formulario de Agregar Producto */}
      {showAddForm && (
        <div className="add-product-form">
          <div className="form-header">
            <div className="form-header-left">
              <div className="form-icon">📦</div>
              <div className="form-title-section">
                <h3 className="form-title">Nuevo Producto</h3>
                <p className="form-subtitle">
                  Agregue un nuevo producto al inventario
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="form-close-button"
            >
              <span className="close-icon">✕</span>
            </button>
          </div>

          <div className="form-content">
            <div className="form-section">
              <h4 className="section-title">Información del Producto</h4>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Nombre del Producto *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        name: (e.target as HTMLInputElement).value,
                      })
                    }
                    className="form-input"
                    placeholder="Ej: Hoppie acero inox 550ML"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Categoría *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: (e.target as HTMLSelectElement).value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Precio (Gs.) *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: (e.target as HTMLInputElement).value,
                      })
                    }
                    className="form-input"
                    placeholder="Ej: 175000"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Stock Inicial *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: (e.target as HTMLInputElement).value,
                      })
                    }
                    className="form-input"
                    placeholder="Ej: 20"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Stock Mínimo</label>
                  <input
                    type="number"
                    value={newProduct.minStock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        minStock: (e.target as HTMLInputElement).value,
                      })
                    }
                    className="form-input"
                    placeholder="Ej: 5"
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Descripción</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: (e.target as HTMLTextAreaElement).value,
                    })
                  }
                  className="form-textarea"
                  placeholder="Descripción del producto..."
                  rows={3}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                onClick={handleAddProduct}
                className="form-button-primary"
              >
                <span className="mr-2">💾</span>
                Guardar Producto
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="form-button-secondary"
              >
                <span className="mr-2">✕</span>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="inventory-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory((e.target as HTMLSelectElement).value)
            }
            className="category-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                product.stock <= product.minStock ? "low-stock" : ""
              }`}
            >
              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-actions">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="delete-button"
                      title="Eliminar producto"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <div className="product-price">
                    {formatNumber(product.price)} Gs.
                  </div>
                  <div className="product-stock">
                    <span className="stock-label">Stock:</span>
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) =>
                        handleUpdateStock(
                          product.id,
                          parseInt((e.target as HTMLInputElement).value)
                        )
                      }
                      className="stock-input"
                      min="0"
                    />
                    <span className="min-stock">(Mín: {product.minStock})</span>
                  </div>
                </div>
              </div>
              {product.stock <= product.minStock && (
                <div className="low-stock-warning">
                  ⚠️ Stock bajo - Reabastecer
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <div className="empty-text">No se encontraron productos</div>
          </div>
        )}
      </div>
    </div>
  );
}
