module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith("panel_role_")) return;

    const index = Number(interaction.customId.split("_")[2]);
    const panel = client.config.panel;
    const emojis = client.config.emojis;

    const roleData = panel.roles[index];
    if (!roleData) {
      return interaction.reply({
        content: `${emojis.error} Invalid role.`,
        ephemeral: true
      });
    }

    const role = interaction.guild.roles.cache.get(roleData.id);
    if (!role) {
      return interaction.reply({
        content: `${emojis.error} Role not found.`,
        ephemeral: true
      });
    }

    const member = interaction.member;

    try {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role.id);
        return interaction.reply({
          content: `${emojis.removed} **${role.name}** role removed.`,
          ephemeral: true
        });
      } else {
        await member.roles.add(role.id);
        return interaction.reply({
          content: `${emojis.success} **${role.name}** role added.`,
          ephemeral: true
        });
      }
    } catch {
      return interaction.reply({
        content: `${emojis.error} I don't have permission to manage this role.`,
        ephemeral: true
      });
    }
  }
};

