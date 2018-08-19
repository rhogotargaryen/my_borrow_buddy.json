# frozen_string_literal: true

module ApplicationHelper
  def show_obj_info(user)
    a = []
    user.attributes.each do |k, v|
      a << "#{k.capitalize}: #{v}" if %w[username name email].include?(k)
    end
    a
  end

  def cust_obj_info(user, *args)
    a = []
    user.attributes.each do |k, v|
      a << "#{k.capitalize}: #{v}" if args.include?(k)
    end
    a
  end

  def show_item_info(item)
    a = []
    item.attributes.each do |k, v|
      if %w[desc name value].include?(k)
        a << "#{k.capitalize}: #{v}"
      elsif k == 'owner_id'
        a << "Belongs to User: #{User.find_by(id: item.owner_id).name}"
      end
    end
    a
  end
  
  def disp_transactions(attr_array)
    attr_array.map do |x|
      if x.include?("Recipient_id")
        if attr_array.include?("Category: add_item")
          return ["this item was added by #{User.find_by(id: x.match(/\d/)[0]).name}"]
        else
          x = "Sent to:  #{User.find_by(id: x.match(/\d/)[0]).name}"
        end
      elsif x.include?("Sender_id")
        x = "Sent by: #{User.find_by(id: x.match(/\d/)[0]).name}"
      else
        x
      end
    end
  end
end
