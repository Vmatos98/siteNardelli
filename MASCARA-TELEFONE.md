# 📱 Máscara de Telefone Implementada

## ✅ Funcionalidade

O campo de telefone agora possui máscara automática que:

- **Formata automaticamente** enquanto o usuário digita
- **Aceita telefones fixos** (10 dígitos): `(11) 9999-9999`
- **Aceita celulares** (11 dígitos): `(11) 99999-9999`
- **Limita a entrada** para no máximo 11 dígitos
- **Remove caracteres** que não sejam números
- **Valida no envio** se o telefone tem 10 ou 11 dígitos

## 🎯 Exemplos de Uso

### Telefone Fixo (10 dígitos)
```
Usuário digita: 1133334444
Resultado: (11) 3333-4444
```

### Celular (11 dígitos)
```
Usuário digita: 11999887766
Resultado: (11) 99988-7766
```

### Formatação em Tempo Real
```
Digita: 11        → (11) 
Digita: 119       → (11) 9
Digita: 1199      → (11) 99
Digita: 11999     → (11) 999
Digita: 119998    → (11) 9999-
Digita: 1199988   → (11) 9999-8
Digita: 11999887  → (11) 9999-87
Digita: 119998877 → (11) 9999-877
Digita: 1199988776 → (11) 9999-8776  (fixo)
Digita: 11999887766 → (11) 99988-7766 (celular)
```

## 🔒 Validações

### No Campo
- **Máximo 15 caracteres** (incluindo formatação)
- **Apenas números** são aceitos
- **Formatação automática** aplicada

### No Envio
- **Mínimo 10 dígitos** (telefone fixo)
- **Máximo 11 dígitos** (celular)
- **Mensagem de erro** se não atender aos critérios

## 💡 Benefícios

1. **UX Melhorada**: Usuário vê formatação em tempo real
2. **Validação Robusta**: Impede envio de números inválidos
3. **Flexibilidade**: Aceita tanto fixo quanto celular
4. **Padrão Brasileiro**: Segue formato nacional (DDD + número)

## 🧪 Como Testar

1. Acesse: http://localhost:3000/orcamento
2. No campo "Telefone / WhatsApp":
   - Digite apenas números
   - Veja a formatação automática
   - Teste com 10 dígitos (fixo)
   - Teste com 11 dígitos (celular)
   - Tente digitar mais de 11 dígitos (será limitado)

## 📋 Códigos de Área Comuns

- **11**: São Paulo
- **21**: Rio de Janeiro  
- **79**: Sergipe (Aracaju)
- **85**: Ceará
- **81**: Pernambuco

A máscara funciona com qualquer DDD brasileiro!