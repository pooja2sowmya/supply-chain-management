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
      complaints: {
        Row: {
          blockchain_hash: string | null
          created_at: string
          description: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          status: string
          title: string
          user_id: string
        }
        Insert: {
          blockchain_hash?: string | null
          created_at?: string
          description: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          status?: string
          title: string
          user_id: string
        }
        Update: {
          blockchain_hash?: string | null
          created_at?: string
          description?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      crops: {
        Row: {
          batch_number: string
          blockchain_hash: string | null
          created_at: string
          crop_name: string
          farmer_id: string
          harvest_date: string | null
          id: string
          price_per_unit: number
          quantity: number
          sowing_date: string | null
          status: Database["public"]["Enums"]["crop_status"]
          type: string
        }
        Insert: {
          batch_number: string
          blockchain_hash?: string | null
          created_at?: string
          crop_name: string
          farmer_id: string
          harvest_date?: string | null
          id?: string
          price_per_unit: number
          quantity: number
          sowing_date?: string | null
          status?: Database["public"]["Enums"]["crop_status"]
          type: string
        }
        Update: {
          batch_number?: string
          blockchain_hash?: string | null
          created_at?: string
          crop_name?: string
          farmer_id?: string
          harvest_date?: string | null
          id?: string
          price_per_unit?: number
          quantity?: number
          sowing_date?: string | null
          status?: Database["public"]["Enums"]["crop_status"]
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crops_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["distributor_id"]
          },
          {
            foreignKeyName: "crops_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["farmer_id"]
          },
          {
            foreignKeyName: "crops_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["retailer_id"]
          },
          {
            foreignKeyName: "crops_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          contact: string
          created_at: string
          feedback: string | null
          id: string
          name: string
          purchase_date: string
          purchased_crop_id: string
          rating: number | null
          retailer_id: string
        }
        Insert: {
          contact: string
          created_at?: string
          feedback?: string | null
          id?: string
          name: string
          purchase_date?: string
          purchased_crop_id: string
          rating?: number | null
          retailer_id: string
        }
        Update: {
          contact?: string
          created_at?: string
          feedback?: string | null
          id?: string
          name?: string
          purchase_date?: string
          purchased_crop_id?: string
          rating?: number | null
          retailer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_purchased_crop_id_fkey"
            columns: ["purchased_crop_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["crop_id"]
          },
          {
            foreignKeyName: "customers_purchased_crop_id_fkey"
            columns: ["purchased_crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["distributor_id"]
          },
          {
            foreignKeyName: "customers_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["farmer_id"]
          },
          {
            foreignKeyName: "customers_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["retailer_id"]
          },
          {
            foreignKeyName: "customers_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          created_at: string
          crop_id: string
          id: string
          price: number
          retailer_id: string
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          crop_id: string
          id?: string
          price: number
          retailer_id: string
          stock_quantity: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          crop_id?: string
          id?: string
          price?: number
          retailer_id?: string
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_crop_id"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["crop_id"]
          },
          {
            foreignKeyName: "fk_crop_id"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["crop_id"]
          },
          {
            foreignKeyName: "inventory_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["distributor_id"]
          },
          {
            foreignKeyName: "inventory_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["farmer_id"]
          },
          {
            foreignKeyName: "inventory_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["retailer_id"]
          },
          {
            foreignKeyName: "inventory_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          target_role: Database["public"]["Enums"]["user_role"]
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          target_role: Database["public"]["Enums"]["user_role"]
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          target_role?: Database["public"]["Enums"]["user_role"]
          title?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          blockchain_hash: string | null
          created_at: string
          crop_id: string
          delivery_date: string | null
          from_user_id: string
          id: string
          shipment_date: string
          status: Database["public"]["Enums"]["shipment_status"]
          to_user_id: string
        }
        Insert: {
          blockchain_hash?: string | null
          created_at?: string
          crop_id: string
          delivery_date?: string | null
          from_user_id: string
          id?: string
          shipment_date?: string
          status?: Database["public"]["Enums"]["shipment_status"]
          to_user_id: string
        }
        Update: {
          blockchain_hash?: string | null
          created_at?: string
          crop_id?: string
          delivery_date?: string | null
          from_user_id?: string
          id?: string
          shipment_date?: string
          status?: Database["public"]["Enums"]["shipment_status"]
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["crop_id"]
          },
          {
            foreignKeyName: "shipments_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["distributor_id"]
          },
          {
            foreignKeyName: "shipments_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["farmer_id"]
          },
          {
            foreignKeyName: "shipments_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["retailer_id"]
          },
          {
            foreignKeyName: "shipments_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["distributor_id"]
          },
          {
            foreignKeyName: "shipments_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["farmer_id"]
          },
          {
            foreignKeyName: "shipments_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "crop_supply_chain"
            referencedColumns: ["retailer_id"]
          },
          {
            foreignKeyName: "shipments_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          region: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          region?: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          region?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
    }
    Views: {
      crop_supply_chain: {
        Row: {
          batch_number: string | null
          crop_id: string | null
          crop_name: string | null
          crop_status: Database["public"]["Enums"]["crop_status"] | null
          distributor_id: string | null
          distributor_name: string | null
          farmer_id: string | null
          farmer_name: string | null
          price_per_unit: number | null
          quantity: number | null
          retail_price: number | null
          retailer_id: string | null
          retailer_name: string | null
          shipment_id: string | null
          shipment_status: Database["public"]["Enums"]["shipment_status"] | null
          stock_quantity: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_my_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      crop_status: "harvested" | "in_transit" | "delivered" | "verified"
      shipment_status: "pending" | "stored" | "in_transit" | "delivered"
      user_role: "farmer" | "distributor" | "retailer" | "admin" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      crop_status: ["harvested", "in_transit", "delivered", "verified"],
      shipment_status: ["pending", "stored", "in_transit", "delivered"],
      user_role: ["farmer", "distributor", "retailer", "admin", "customer"],
    },
  },
} as const
