module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const panel = interaction.client.config.panel;
    const emojis = interaction.client.config.emojis;

    if (!interaction.customId.startsWith("panel_role_")) return;

    const index = parseInt(interaction.customId.split("_")[2]);
    const roleData = panel.roles[index];

    if (!roleData) {
      return interaction.reply({ content: `${emojis.error} Role not found!`, ephemeral: true });
    }

    const member = interaction.member;
    const role = interaction.guild.roles.cache.get(roleData.id);

    if (!role) {
      return interaction.reply({ content: `${emojis.error} Role does not exist in this server.`, ephemeral: true });
    }

    try {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        await interaction.reply({ content: `${emojis.removed} Removed the role **${role.name}**`, ephemeral: true });
      } else {
        await member.roles.add(role);
        await interaction.reply({ content: `${emojis.success} Added the role **${role.name}**`, ephemeral: true });
      }
    } catch (err) {
      console.error(err);
      return interaction.reply({ content: `${emojis.error} Failed to update role. Check bot permissions.`, ephemeral: true });
    }
  }
};
