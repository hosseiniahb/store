export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_item: {
        Row: {
          created_at: string | null
          id: string
          modified_at: string | null
          product_id: string
          quantity: number
          session_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          product_id?: string
          quantity: number
          session_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          product_id?: string
          quantity?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cart_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      order_details: {
        Row: {
          created_at: string | null
          id: string
          modified_at: string | null
          payment_id: string
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          payment_id?: string
          total: number
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          payment_id?: string
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_order_details_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "payment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_order_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          modified_at: string | null
          order_id: string
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          order_id?: string
          product_id?: string
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          order_id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_details: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          modified_at: string | null
          order_id: string
          provider: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          modified_at?: string | null
          order_id?: string
          provider: string
          status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          modified_at?: string | null
          order_id?: string
          provider?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_payment_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "order_details"
            referencedColumns: ["payment_id"]
          },
        ]
      }
      product_category: {
        Row: {
          created_at: string | null
          description: string
          id: string
          modified_at: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          modified_at?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          modified_at?: string | null
          name?: string
        }
        Relationships: []
      }
      product_sub_category: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          id: string
          modified_at: string | null
          name: string
        }
        Insert: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          modified_at?: string | null
          name: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          modified_at?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sub_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string
          count: number
          created_at: string | null
          description: string
          id: string
          image_url: string
          inventory_id: string
          modified_at: string | null
          price: number
          title: string
        }
        Insert: {
          category_id: string
          count: number
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          inventory_id?: string
          modified_at?: string | null
          price: number
          title: string
        }
        Update: {
          category_id?: string
          count?: number
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          inventory_id?: string
          modified_at?: string | null
          price?: number
          title?: string
        }
        Relationships: []
      }
      shopping_session: {
        Row: {
          created_at: string | null
          id: string
          modified_at: string | null
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          total: number
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_shopping_session_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_address: {
        Row: {
          address: string
          city: string
          country: string
          id: string
          mobile: string
          postal_code: string
          telephone: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          country: string
          id?: string
          mobile: string
          postal_code: string
          telephone: string
          user_id?: string
        }
        Update: {
          address?: string
          city?: string
          country?: string
          id?: string
          mobile?: string
          postal_code?: string
          telephone?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_address_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_payment: {
        Row: {
          account_no: number
          expiry: string
          id: string
          payment_type: string
          provider: string
          user_id: string
        }
        Insert: {
          account_no: number
          expiry: string
          id?: string
          payment_type: string
          provider: string
          user_id?: string
        }
        Update: {
          account_no?: number
          expiry?: string
          id?: string
          payment_type?: string
          provider?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_payment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          favorite_list: string[] | null
          id: string
          modified_at: string | null
          phone: string | null
          role: string
          user_name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          favorite_list?: string[] | null
          id?: string
          modified_at?: string | null
          phone?: string | null
          role?: string
          user_name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          favorite_list?: string[] | null
          id?: string
          modified_at?: string | null
          phone?: string | null
          role?: string
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
